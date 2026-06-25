import { z } from 'zod'

export const CreatePolicySchema = z.object({
    routeId: z.string(),
    limit: z.number().int().positive(),
    windowSeconds: z.number().int().positive(),
    identifierType: z.enum(['USER_ID', 'API_KEY', 'IP'])
})

export const UpdatePolicySchema = CreatePolicySchema.partial()

export type CreatePolicyInput = z.infer<typeof CreatePolicySchema>
export type UpdatePolicyInput = z.infer<typeof UpdatePolicySchema>