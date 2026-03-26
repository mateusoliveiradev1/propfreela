'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Field, Input, Textarea } from '@propfreela/ui'
import { CreateProposalSchema, type CreateProposalInput } from '@propfreela/validators'
import { trpc } from '@/lib/trpc/client'
import { parseCurrencyToCents, centsToInputValue } from '@/lib/currency'
import { UpgradeModal } from '@/components/proposals/UpgradeModal'
import { useState } from 'react'
import type { Proposal } from '@propfreela/db'

type Props = {
  defaultValues?: Partial<CreateProposalInput>
  proposalId?: string // if set, update mode
}

export function ProposalForm({ defaultValues, proposalId }: Props) {
  const router = useRouter()
  const [showUpgrade, setShowUpgrade] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateProposalInput>({
    resolver: zodResolver(CreateProposalSchema),
    defaultValues: {
      templateId: 'clean',
      ...defaultValues,
    },
  })

  const createMutation = trpc.proposals.create.useMutation({
    onSuccess: (proposal: Proposal) => {
      router.push(`/propostas/${proposal.id}`)
    },
    onError: (err) => {
      if (err.data?.code === 'FORBIDDEN') {
        setShowUpgrade(true)
      }
    },
  })

  const updateMutation = trpc.proposals.update.useMutation({
    onSuccess: (proposal: Proposal) => {
      router.push(`/propostas/${proposal.id}`)
    },
  })

  function onSubmit(data: CreateProposalInput) {
    if (proposalId) {
      updateMutation.mutate({ id: proposalId, ...data })
    } else {
      createMutation.mutate(data)
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending || isSubmitting

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Client info */}
        <div className="space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
            Dados do cliente
          </p>
          <div className="grid grid-cols-2 gap-6">
            <Field label="Nome do cliente" error={errors.clientName?.message} required>
              <Input
                {...register('clientName')}
                placeholder="Acme Corp"
                error={!!errors.clientName}
              />
            </Field>
            <Field label="Email (opcional)" error={errors.clientEmail?.message}>
              <Input
                {...register('clientEmail')}
                type="email"
                placeholder="contato@empresa.com"
                error={!!errors.clientEmail}
              />
            </Field>
          </div>
        </div>

        {/* Proposal info */}
        <div className="space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
            Sobre a proposta
          </p>
          <Field label="Título interno" error={errors.title?.message} required>
            <Input
              {...register('title')}
              placeholder="Website para Acme Corp — Março 2026"
              error={!!errors.title}
            />
          </Field>
          <Field label="Escopo do projeto" error={errors.scope?.message} required>
            <Textarea
              {...register('scope')}
              placeholder="Descreva o que será entregue, tecnologias, entregas, etc."
              rows={5}
              error={!!errors.scope}
            />
          </Field>
        </div>

        {/* Financial */}
        <div className="space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
            Valores e prazos
          </p>
          <div className="grid grid-cols-2 gap-6">
            <Field label="Valor (R$)" error={errors.valueInCents?.message} required>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="4500.00"
                error={!!errors.valueInCents}
                onChange={(e) => {
                  setValue('valueInCents', parseCurrencyToCents(e.target.value), {
                    shouldValidate: true,
                  })
                }}
                defaultValue={
                  defaultValues?.valueInCents
                    ? centsToInputValue(defaultValues.valueInCents)
                    : ''
                }
              />
            </Field>
            <Field label="Prazo de entrega" error={errors.deadline?.message}>
              <Input {...register('deadline')} type="date" />
            </Field>
          </div>
          <Field label="Condições de pagamento" error={errors.paymentTerms?.message}>
            <Input
              {...register('paymentTerms')}
              placeholder="50% na aprovação, 50% na entrega"
            />
          </Field>
        </div>

        {/* Template */}
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
            Template do PDF
          </p>
          <div className="grid grid-cols-2 gap-4">
            {(['clean', 'moderno'] as const).map((t) => (
              <label
                key={t}
                className="flex cursor-pointer items-center gap-3 rounded-sm border border-border p-4 transition-colors has-[:checked]:border-accent has-[:checked]:bg-bg-subtle"
              >
                <input
                  type="radio"
                  value={t}
                  {...register('templateId')}
                  className="accent-accent"
                />
                <span className="text-sm capitalize text-fg-base">{t}</span>
              </label>
            ))}
          </div>
        </div>

        <Button type="submit" loading={isPending} size="lg">
          {proposalId ? 'Salvar alterações' : 'Gerar proposta'}
        </Button>
      </form>

      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    </>
  )
}
