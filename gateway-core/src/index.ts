import express from 'express'
import { proxyController } from './proxy/proxy.handler.js';
import { subscribe } from './cache/subscriber.js';
import { loadRoutes } from './cache/loader.js';
import { connectRedisSubscribe } from './config/redis.js';

const app=express() ;



app.get("/health",(req,res)=>{

    res.status(200).json({
        status:"ok",
        service:"gateway-core"
    })
})

app.use('/', proxyController)

async function init() {
    await connectRedisSubscribe()
    await loadRoutes()
    await subscribe()
    app.listen(3000, () => console.log("gateway-core is running on port 3000"))
}

init(); 