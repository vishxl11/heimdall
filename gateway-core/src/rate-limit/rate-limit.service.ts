import fs from 'fs' ;
import { redisClient } from '../config/redis.js';
import path from 'path';
import { fileURLToPath } from 'url';

 const __dirname = path.dirname(fileURLToPath(import.meta.url))
 const script = fs.readFileSync(path.join(__dirname, 'rate-limit.lua'), 'utf-8')

export async function checkRateLimit(key:string,limit:number,windowSecond:number){

    const result=await redisClient.eval(script,{
       keys:[key],
       arguments:[Date.now().toString(),windowSecond.toString(),limit.toString()]

    }) ;

    return result==1 ;
}