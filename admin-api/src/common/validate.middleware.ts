import {z, ZodType} from "zod"
import type{ Request,Response,NextFunction } from "express";



export function validateSchema(schema:ZodType){

    return (req:Request,res:Response,next:NextFunction)=>{

        try{
            const data=req.body ;

            const result= schema.parse(data)

            next() ;
        }
        catch(e)
        {
           if(e instanceof z.ZodError) 
            {
                res.status(400).json({ errors: e.issues })
            }
            else
            {
                next(e); 
            }
        }

    }

}