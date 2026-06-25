import { z } from 'zod'

export const UpdateUserSchema = z.object({
    email: z.email().optional(),
    password: z.string().min(8).max(32).optional()
})

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>