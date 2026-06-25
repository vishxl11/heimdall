import type { Request,Response,NextFunction } from "express";
import { signUpService,SignInService } from "./auth.services.js";


export const SignUpController=async(req:Request,res:Response,next:NextFunction)=>{

   try{
         const email=req.body.email ;
        const password=req.body.password ;

        const adminUser=await signUpService(email,password) ;

        return  res.status(201).json(adminUser) // signUp


   }
   catch(e)
   {
        if(e instanceof Error)
        {
              if(e.message=="Email taken")
              {
                  return    res.status(409).json({
                        message:"Email taken"
                    })
              }

             next(e) ;
        }
   }
}

export const SignInController=async(req:Request,res:Response,next:NextFunction)=>{

   try{
         const email=req.body.email ;
        const password=req.body.password ;

        const adminUser=await SignInService(email,password) ;

        return res.status(200).json(adminUser) // signIn


   }
   catch(e)
   {
        if(e instanceof Error)
        {
              if(e.message=="User does not exists")
              {
                  return res.status(401).json({
                        message:"User does not exists"
                    })
              }

              if(e.message=="Invalid Credentials")
              {
                return   res.status(401).json({
                    message:"Invalid credentials"
                 })
              }

             next(e) ;
        }
   }

}