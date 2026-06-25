import {z} from 'zod'

const CreateRouteSchema=z.object({
    path:z.string(),
    method:z.enum([
        "POST",
        "GET",
        "PUT",
        "PATCH",
        "DELETE"
    ]),
    upstreamUrl:z.url(),
    rateLimitPolicyId:z.uuid().optional(),
    circuitBreakerConfigId:z.uuid().optional(),
    isActive:z.boolean().optional().default(true) 
})

const UpdateRouteSchema=CreateRouteSchema.partial() ;

export {CreateRouteSchema,
        UpdateRouteSchema } ;

export type CreateRouteInput = z.infer<typeof CreateRouteSchema>
export type UpdateRouteInput = z.infer<typeof UpdateRouteSchema>