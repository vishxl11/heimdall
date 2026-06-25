import type{ Request,Response ,NextFunction} from "express";
import { createRoute,updateRoute,getRoutes,getRouteById,deleteRoute } from "./routes.services.js";


const createRouteController=async (req:Request,res:Response,next:NextFunction)=>{

    try{
        const data=req.body ;
       const adminId = (req as any).user.id ;

        const route=await createRoute(data,adminId) ;

        res.status(201).json({
            route
        })

    }
    catch(e){
        next(e) ;
    } 
}

const updateRouteController=async (req:Request,res:Response,next:NextFunction)=>{

    try{
        const data=req.body ;
        const adminId = (req as any).user.id ;
        const routeId=req.params.id as string ;

        const route=await updateRoute(data, routeId , adminId) ;

        res.status(200).json({
            route
        })

    }
    catch(e){
        next(e) ;
    } 
}

const getRoutesController=async (req:Request,res:Response,next:NextFunction)=>{

    try{
       
        const adminId = (req as any).user.id ;
        const route=await getRoutes(adminId) ;

        res.status(200).json({
            route
        })

    }
    catch(e){
        next(e) ;
    } 
}

const getRouteByIdController=async (req:Request,res:Response,next:NextFunction)=>{

    try{
       
        const routeId=req.params.id as string ;

        const route=await getRouteById(routeId) ;

        if (!route) return res.status(404).json({ message: "Route not found" })

        res.status(200).json({
            route
        })

    }
    catch(e){
        next(e) ;
    } 
}

const deleteRouteController=async (req:Request,res:Response,next:NextFunction)=>{

    try{
       
        const adminId = (req as any).user.id ;
        const routeId=req.params.id as string ;

        const route=await deleteRoute(routeId,adminId) ;

        res.status(204).send() ;

    }
    catch(e){
        next(e) ;
    } 
}

export {createRouteController,updateRouteController,getRouteByIdController,
    getRoutesController,deleteRouteController}
