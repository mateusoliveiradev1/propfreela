import { z } from 'zod'

// ─── Enums (mirrors DB schema, avoids runtime import of @propfreela/db) ───────

export const ProposalTemplateEnum = z.enum(['clean', 'moderno', 'bold', 'minimal', 'executivo'])
export const ProposalStatusEnum = z.enum(['rascunho', 'enviada', 'aprovada', 'recusada'])

// ─── Create ───────────────────────────────────────────────────────────────────

export const CreateProposalSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100, 'Título muito longo'),
  clientName: z
    .string()
    .min(1, 'Nome do cliente é obrigatório')
    .max(100, 'Nome muito longo'),
  clientEmail: z.string().email('Email inválido').optional().or(z.literal('')),
  scope: z.string().min(10, 'Descreva o escopo com pelo menos 10 caracteres'),
  valueInCents: z
    .number({ required_error: 'Valor é obrigatório' })
    .int('Valor deve ser um número inteiro')
    .positive('Valor deve ser maior que zero'),
  deadline: z.string().optional(),
  paymentTerms: z.string().optional(),
  templateId: ProposalTemplateEnum,
})

export type CreateProposalInput = z.infer<typeof CreateProposalSchema>

// ─── Update ───────────────────────────────────────────────────────────────────

export const UpdateProposalSchema = CreateProposalSchema.partial().extend({
  id: z.string().min(1),
  status: ProposalStatusEnum.optional(),
})

export type UpdateProposalInput = z.infer<typeof UpdateProposalSchema>

// ─── Filters ─────────────────────────────────────────────────────────────────

export const ListProposalsSchema = z.object({
  status: ProposalStatusEnum.optional(),
})

export type ListProposalsInput = z.infer<typeof ListProposalsSchema>

// ─── AI Generation ──────────────────────────────────────────────────────────

export const GenerateScopeSchema = z.object({
  clientName: z.string().min(1, 'Nome do cliente é obrigatório'),
  title: z.string().min(1, 'Título é obrigatório'),
  valueInCents: z.number().int().positive().optional(),
  currentScope: z.string().optional(),
})

export type GenerateScopeInput = z.infer<typeof GenerateScopeSchema>
