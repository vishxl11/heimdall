import type { Plugin } from './plugin.type.js'

export const rateLimiterPlugin: Plugin = async (req, res, next, route) => {
    // Phase 5 — rate limiting logic goes here
    next()
}