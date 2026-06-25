import jwt from 'jsonwebtoken'
import prisma from '../common/prisma.js'
import bcrypt from 'bcrypt'
import { JWT_SECRET } from '../common/config.js';

export async function signUpService(email:string,password:string)
{
    const existing=await prisma.adminUser.findUnique({
        where:{
            email:email
        }
    })

    if(existing)
    {
        throw new Error("Email taken") ;
    }

    const hashedPassword=await bcrypt.hash(password,5) ;

    const adminUser=await prisma.adminUser.create({
        data:{
            email,
            password:hashedPassword
        }
    })

    const adminId=adminUser.adminId ;

    const token=jwt.sign({
        id:adminId 
    },JWT_SECRET) ;

   return {
    token,
    adminId: adminUser.adminId,
    email: adminUser.email
    }
}

export async function SignInService(email:string,password:string) {

    const user=await prisma.adminUser.findUnique({
        where:{
            email:email
        }
    }) 

    if(!user)
    {
        throw new Error("User does not exist") 
    }

    const isValid=await bcrypt.compare(password,user.password) ;

    if(!isValid)
    {
         throw new Error("Invalid Credentials") 
    }

    const token=jwt.sign({
        id:user.adminId  
    },JWT_SECRET) ;


    return {
        email:user.email,
        adminId:user.adminId ,
        token 
    }
    
} 