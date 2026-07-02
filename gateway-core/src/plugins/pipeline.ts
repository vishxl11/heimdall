import type { Request, Response, NextFunction } from "express"
import { getRoute } from "../cache/route.cache.js"
import type { Plugin } from "./plugin.type.js"
import type { Route } from "../types/route.js"
import { circuitBreakerPlugin } from "./circuit-breaker.plugin.js"
import { rateLimiterPlugin } from "./rateLimiter.plugin.js"
import { transformerPlugin } from "./transformer.plugin.js"
import { trace, SpanStatusCode } from '@opentelemetry/api'
import { httpRequestCounter, httpRequestDuration } from '../metrics/metrics.js'

const tracer = trace.getTracer('gateway-core')

export const pipeline = async (req: Request, res: Response, next: NextFunction) => {

    const span = tracer.startSpan('route-match')
    const timer = httpRequestDuration.startTimer({ method: req.method, path: req.path })

    try {
        const path = req.path
        const method = req.method
        let plugins: Plugin[] = []

        const route = getRoute(path, method)

        if (!route) {
            span.setAttribute('route.found', false)
            span.end()
            timer()
            httpRequestCounter.inc({ method, path, status: '404' })
            return res.status(404).json({ message: "Route not found" })
        }

        span.setAttribute('route.found', true)
        span.setAttribute('route.path', route.path)
        span.setAttribute('route.method', route.method)
        span.setAttribute('route.id', route.routeId)

        ;(req as any).matchedRoute = route

        res.on('finish', () => {
            timer()
            httpRequestCounter.inc({
                method: req.method,
                path: route.path,
                status: res.statusCode.toString()
            })
        })

        if (route.RateLimitPolicies) plugins.push(rateLimiterPlugin)
        if (route.circuitBreakerConfigs) plugins.push(circuitBreakerPlugin)
        plugins.push(transformerPlugin)

        span.end()

        function runPlugins(plugins: Plugin[], req: Request, res: Response, next: NextFunction, route: Route) {
            let index = 0
            function runNext() {
                if (index >= plugins.length) return next()
                const plugin = plugins[index++]
                if (!plugin) return next()
                plugin(req, res, runNext, route)
            }
            runNext()
        }

        runPlugins(plugins, req, res, next, route)

    } catch (e) {
        span.recordException(e as Error)
        span.setStatus({ code: SpanStatusCode.ERROR })
        span.end()
        timer()
        next(e)
    }
}