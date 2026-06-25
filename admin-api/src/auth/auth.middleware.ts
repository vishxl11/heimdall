import type{ Request,Response,NextFunction } from "express"
import { JWT_SECRET } from "../common/config.js";
import jwt from 'jsonwebtoken'


export function auth(req:Request,res:Response,next:NextFunction){

    try
    {
        const authHeader=req.headers.authorization ;
        const token=authHeader?.split(' ')[1] ;

        if (!token) return res.status(401).json({ message: "Unauthorized" })

        const decoded=jwt.verify(token,JWT_SECRET) ;

            (req as any).user = { id: (decoded as any).id }

            next() ;
        
    }catch(e)
    {
        res.status(401).json({ message: "Unauthorized" }) ;
    }

} 