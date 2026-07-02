import { getCircuitState, recordFailure, recordSuccess } from '../circuit-breaker/cb.services.js'
import { redisClient } from '../config/redis.js'
import type { Plugin } from './plugin.type.js'
import { trace, SpanStatusCode } from '@opentelemetry/api'

const tracer = trace.getTracer('gateway-core')

export const circuitBreakerPlugin: Plugin = async (req, res, next, route) => {

    const span = tracer.startSpan('circuit-breaker-check')

    try {
        if (!route.circuitBreakerConfigs) {
            span.end()
            return next()
        }

        const routeId = route.routeId
        const openDurationSeconds = route.circuitBreakerConfigs.openDurationSeconds
        const failureThreshold = route.circuitBreakerConfigs.failureThreshold
        const windowSeconds = route.circuitBreakerConfigs.windowSeconds

        const state = await getCircuitState(routeId, openDurationSeconds)

        span.setAttribute('circuit.state', state ?? 'CLOSED')
        span.setAttribute('route.id', routeId)

        if (state === 'OPEN') {
            span.end()
            return res.status(503).json({ message: 'Service unavailable' })
        }

        if (state === 'HALF_OPEN') {
            const halfOpenKey = `cb:${routeId}:halfOpenCount`
            const count = await redisClient.incr(halfOpenKey)
            if (count > route.circuitBreakerConfigs.halfOpenMaxRequests) {
                span.end()
                return res.status(503).json({ message: 'Service unavailable' })
            }
        }

        res.on('finish', async () => {
            if (res.statusCode >= 500) {
                await recordFailure(routeId, failureThreshold, windowSeconds)
            } else {
                await recordSuccess(routeId)
            }
        })

        span.end()
        next()

    } catch (e) {
        span.recordException(e as Error)
        span.setStatus({ code: SpanStatusCode.ERROR })
        span.end()
        next(e)
    }
}