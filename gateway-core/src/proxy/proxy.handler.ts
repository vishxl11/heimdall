import type{ Request,Response,NextFunction } from "express"
import { getRoute } from "../cache/route.cache.js";
import { createProxyMiddleware } from "http-proxy-middleware";



export const proxyController=(req:Request,res:Response,next:NextFunction)=>{

    try{

        const path=req.path ;
        const method=req.method ;

        const route=getRoute(path,method) ;

        if(!route)
        {
            return res.status(404).json({
                message:"Route not found"
            }) ;
        }

       const proxy = createProxyMiddleware({
        target: route.upstreamURL,
        changeOrigin: true,
        pathRewrite: { [`^${route.path}`]: '' }
    })

        proxy(req, res, next)

    }
    catch(e)
    {
         next(e) ;
    }

}