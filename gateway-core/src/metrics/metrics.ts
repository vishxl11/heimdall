import { Registry, Counter, Histogram, Gauge } from 'prom-client'

export const register = new Registry()

export const httpRequestCounter = new Counter({
    name: 'gateway_requests_total',
    help: 'Total number of requests through gateway',
    labelNames: ['method', 'path', 'status'],
    registers: [register]
})

export const httpRequestDuration = new Histogram({
    name: 'gateway_request_duration_seconds',
    help: 'Request duration in seconds',
    labelNames: ['method', 'path'],
    registers: [register]
})

export const rateLimitRejections = new Counter({
    name: 'gateway_rate_limit_rejections_total',
    help: 'Total number of rate limit rejections',
    labelNames: ['route_id'],
    registers: [register]
})

export const circuitBreakerState = new Gauge({
    name: 'gateway_circuit_breaker_state',
    help: 'Circuit breaker state per route (0=CLOSED, 1=HALF_OPEN, 2=OPEN)',
    labelNames: ['route_id'],
    registers: [register]
})