import {z} from 'zod'

const SignUpSchema=z.object({
    email:z.email() ,
    password:z.string().min(8).max(32)  
})

const SignInSchema = SignUpSchema

export {SignInSchema,SignUpSchema } ;

export type SignInType = z.infer<typeof SignInSchema>
export type SignUpType= z.infer<typeof SignUpSchema>