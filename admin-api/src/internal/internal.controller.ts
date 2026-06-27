import type{ NextFunction, Request,Response } from "express";
import prisma from "../common/prisma.js";

export const getRoutesInternal=async (req:Request,res:Response,next:NextFunction)=>{

   try{
        const routes=await prisma.route.findMany(
            {
                where:{
                    isActive:true 
                },
                include: {
                    RateLimitPolicies: true,
                    circuitBreakerConfigs: true
                }
            }
        ) ;

        res.status(200).json({
            routes
        })
   }
   catch(e)
   {
       next(e) ;
   }

}

export const getRouteByIdInternal=async (req:Request,res:Response,next:NextFunction)=>{
    
    try{
            const routeId = req.params.id as string ;

            const route=await prisma.route.findUnique({
                where:{
                    routeId
                },
                include: {
                    RateLimitPolicies: true,
                    circuitBreakerConfigs: true
                }
            }
            )

            if(!route)
            {
            return res.status(404) ;

            }

            return res.status(200).json({
                route
            })
    }
    catch(e)
    {
         next(e) ;
    }
}
