import type { Request,Response,NextFunction } from "express"
import { getRoute } from "../cache/route.cache.js";
import type{ Plugin } from "./plugin.type.js";
import type{ Route } from "../types/route.js";
import { circuitBreakerPlugin } from "./circuit-breaker.plugin.js";
import { rateLimiterPlugin } from "./rateLimiter.plugin.js";
import { transformerPlugin } from "./transformer.plugin.js";


export const pipeline=async (req:Request,res:Response,next:NextFunction)=>{

            const path=req.path ;
            const method=req.method ;
           let plugins: Plugin[] = [] ;
    
            const route=getRoute(path,method) ;
    
            if(!route)
            {
                return res.status(404).json({
                    message:"Route not found"
                }) ;
            }

            (req as any).matchedRoute = route ;


            if (route.RateLimitPolicies) {
                plugins.push(rateLimiterPlugin)
            }

            if (route.circuitBreakerConfigs) {
                plugins.push(circuitBreakerPlugin)
            }

            plugins.push(transformerPlugin) ;


           function runPlugins(plugins: Plugin[], req: Request, res: Response, next: NextFunction, route: Route) {
            let index = 0
            function runNext() {
                    if (index >= plugins.length) return next()
                    const plugin = plugins[index++]
                    if (!plugin) return next()
                    plugin(req, res, runNext, route)
                }
            runNext()
        }

     

        runPlugins(plugins,req,res,next,route) ;

            


}