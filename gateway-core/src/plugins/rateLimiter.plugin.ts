import type { Plugin } from './plugin.type.js'
import type { Route } from '../types/route.js'
import { RateLimitKey } from '../types/route.js'
import { checkRateLimit } from '../rate-limit/rate-limit.service.js'
import { trace,SpanStatusCode } from '@opentelemetry/api'

export const rateLimiterPlugin: Plugin = async (req, res, next, route: Route) => {

    const tracer = trace.getTracer('gateway-core')
    const span = tracer.startSpan('rate-limit-check')

    try {
        const identifier = route.RateLimitPolicies?.identifierType
        const limit = route.RateLimitPolicies?.limit
        const windowSeconds = route.RateLimitPolicies?.windowSeconds

        if (!limit || !windowSeconds) {
            span.end()
            return next()
        }

        let rawIdentifier: string

        if (identifier === RateLimitKey.IP) rawIdentifier = req.ip ?? 'unknown'
        else if (identifier === RateLimitKey.USER_ID) rawIdentifier = (req.headers['x-user-id'] as string) ?? req.ip ?? 'unknown'
        else if (identifier === RateLimitKey.API_KEY) rawIdentifier = (req.headers['x-api-key'] as string) ?? 'unknown'
        else rawIdentifier = req.ip ?? 'unknown'

        const key = `ratelimit:${route.routeId}:${rawIdentifier}`
        const allowed = await checkRateLimit(key, limit, windowSeconds)

        span.setAttribute('allowed', allowed)
        span.setAttribute('route.id', route.routeId)

        if (!allowed) {
            span.end()
            return res.status(429).json({ message: 'Too many Requests' })
        }

        span.end()
        next()

    } catch (e) {
        span.recordException(e as Error)
        span.setStatus({ code: SpanStatusCode.ERROR })
        span.end()
        next(e)
    }
}