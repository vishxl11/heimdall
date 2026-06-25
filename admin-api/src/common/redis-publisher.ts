import {createClient} from 'redis'
import { REDIS_URL } from './config.js'

export const redisClient=createClient({
    url:REDIS_URL
}) ;

export async function connectRedis() {
  await redisClient.connect()
}


