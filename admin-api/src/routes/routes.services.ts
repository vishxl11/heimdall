import prisma from "../common/prisma.js";
import createAuditLog from "../common/audit-service.js";
import type{ CreateRouteInput,UpdateRouteInput } from "./routes.schema.js";
import { redisClient } from "../common/redis-publisher.js";


export async function createRoute(data:CreateRouteInput,adminId:string,){

   const route=await prisma.route.create({
        data:{
           admin: {
        connect: { adminId: adminId }
           },
           path: data.path,
           upstreamURL:data.upstreamUrl,
           method:data.method,
           isActive:data.isActive
        }
    })

    await createAuditLog(adminId,"ROUTE_CREATED","ROUTE",route.routeId,null,route) ;

   await redisClient.publish('heimdall:route-update', JSON.stringify({ 
    routeId: route.routeId, 
    action: 'CREATED' 
    }))

    return route ;
}

export async function getRoutes(adminId:string){

    const Routes=await prisma.route.findMany({
        where:{
            adminId:adminId
        }
    })

    return Routes ;
}

export async function getRouteById(routeId:string) {

    const Route=await prisma.route.findUnique({
        where:{
            routeId:routeId
        }
    }) 

    return Route ;
}


export async function updateRoute(data:UpdateRouteInput,routeId:string,adminId:string){

    const previousValue=await prisma.route.findUnique({
        where:{
            routeId:routeId
        }
    })
  
   const newValue=await prisma.route.update({
          where:{
        routeId:routeId
          },
          data: JSON.parse(JSON.stringify(data))
    }) 

   await createAuditLog(adminId,"ROUTE_UPDATE","ROUTE",routeId,previousValue,newValue) ;

     await redisClient.publish('heimdall:route-update', JSON.stringify({ 
    routeId: newValue.routeId, 
    action: 'UPDATED' 
    }))

   return newValue ;

}

export async function deleteRoute(routeId:string,adminId:string) {

    const previousValue=await prisma.route.findUnique({
        where:{
            routeId:routeId
        }
    })

    const deletedRoute=await prisma.route.delete({
        where:{
            routeId:routeId
        }
    })

    await createAuditLog(adminId ,"ROUTE_DELETE","ROUTE",routeId,previousValue,null)

     await  redisClient.publish('heimdall:route-update', JSON.stringify({ 
    routeId: routeId, 
    action: 'DELETED' 
    }))
    
}