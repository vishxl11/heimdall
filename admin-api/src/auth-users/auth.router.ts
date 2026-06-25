import { Router } from "express";
import { SignInController,SignUpController } from "./auth.controller.js";
import { validateSchema } from "../common/validate.middleware.js";
import { SignInSchema, SignUpSchema } from "./auth.schema.js";

const authRouter=Router() ;


authRouter.post('/signup',validateSchema(SignUpSchema),SignUpController) ;

authRouter.post('/signin',validateSchema(SignInSchema),SignInController) ;

export {authRouter} ;