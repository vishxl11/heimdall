import { getCircuitState, recordFailure, recordSuccess } from '../circuit-breaker/cb.services.js';
import { redisClient } from '../config/redis.js';
import type { Plugin } from './plugin.type.js'

export const circuitBreakerPlugin: Plugin = async (req, res, next, route) => {

    if (!route.circuitBreakerConfigs) return next()

    const routeId=route.routeId ;
    const openDurationSeconds=route.circuitBreakerConfigs.openDurationSeconds ;
    const failureThreshold=route.circuitBreakerConfigs.failureThreshold ;
    const windowSeconds=route.circuitBreakerConfigs.windowSeconds ;

    const state=await getCircuitState(routeId,openDurationSeconds) ;

    if(state=='OPEN')
    {
         return res.status(503).json({ message: 'Service unavailable' })
    }
    else if(state=='HALF_OPEN')
    {    
        const halfOpenKey = `cb:${routeId}:halfOpenCount`

        const count = await redisClient.incr(halfOpenKey)

        if (count > route.circuitBreakerConfigs!.halfOpenMaxRequests) {
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

    next()
}