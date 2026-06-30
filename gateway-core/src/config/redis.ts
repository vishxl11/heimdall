import {createClient} from 'redis'
import { REDIS_URL } from '../common/config.js'

export const SubscriberClient=createClient({
    url:REDIS_URL 
}) ;

export async function connectRedisSubscribe() {
    await SubscriberClient.connect()    
}


export const redisClient = createClient({ url: REDIS_URL })

export async function connectRedis() {
    await redisClient.connect()
}

