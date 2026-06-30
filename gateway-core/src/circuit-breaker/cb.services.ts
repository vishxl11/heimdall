import { redisClient } from "../config/redis.js";

export async function getCircuitState(routeId:string,openDurationSeconds:number) {

    const key=`cb:${routeId}:state` ;

    if(await redisClient.exists(key))
    {
         const state=await redisClient.get(key) ;

         if(state=='OPEN')
         {
             const openKey=`cb:${routeId}:openedAt` ;
             const openedAt=await redisClient.get(openKey) ;
             const now=Date.now() ;
             const openedAtTime=parseInt(openedAt!) ;

             if((now-openedAtTime)>=openDurationSeconds*1000)
             {
                  await redisClient.set(key,'HALF_OPEN') ;
                  return 'HALF_OPEN' ;
             }

             return 'OPEN' ;
         }

         return state ;
    }
    else
    {
        await redisClient.set(key,'CLOSED') ;
        return 'CLOSED' ;
    }
}

export async function recordFailure(routeId:string,failureThreshold:number,windowSeconds:number)
{
    const failureKey=`cb:${routeId}:failures` ;
    const stateKey=`cb:${routeId}:state` ;
    const openedAtKey=`cb:${routeId}:openedAt` ;

    await redisClient.incr(failureKey) ;

    const failureCnt=await redisClient.get(failureKey) ;
    const failureCount=parseInt(failureCnt!) ;

    if (failureCount === 1) {
    await redisClient.expire(failureKey, windowSeconds)
    }
    

    if(failureCount>=failureThreshold)
    {
        await redisClient.set(stateKey,'OPEN') ;
        await redisClient.set(openedAtKey,Date.now().toString()) ;

    }
}

export async function recordSuccess(routeId:string)
{
    const failureKey=`cb:${routeId}:failures` ;
    const stateKey=`cb:${routeId}:state` ;
    const halfOpenCntKey=`cb:${routeId}:halfOpenCount` ;

    await redisClient.del(failureKey) ;
    await redisClient.set(stateKey,'CLOSED') ;
    await redisClient.del(halfOpenCntKey) ;

}