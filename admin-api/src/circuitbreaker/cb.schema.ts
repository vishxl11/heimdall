import { z } from 'zod'

export const CreateCBSchema = z.object({
    routeId: z.string(),
    failureThreshold: z.number().int().positive(),
    windowSeconds: z.number().int().positive(),
    openDurationSeconds: z.number().int().positive(),
    halfOpenMaxRequests: z.number().int().positive()
})

export const UpdateCBSchema = CreateCBSchema.partial()

export type CreateCBInput = z.infer<typeof CreateCBSchema>
export type UpdateCBInput = z.infer<typeof UpdateCBSchema>