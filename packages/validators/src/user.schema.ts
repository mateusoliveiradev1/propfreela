import { z } from 'zod'

export const UpdateUserSchema = z.object({
  companyName: z.string().max(100, 'Nome muito longo').optional(),
  accentColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Cor inválida — use formato #RRGGBB')
    .optional(),
  logoUrl: z.string().url('URL inválida').optional().nullable(),
})

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>

export const CreateCheckoutSessionSchema = z.object({
  interval: z.enum(['month', 'year']),
})

export type CreateCheckoutSessionInput = z.infer<typeof CreateCheckoutSessionSchema>
