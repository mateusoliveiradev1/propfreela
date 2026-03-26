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

// ─── Template metadata ──────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: 'clean' as const,
    name: 'Clean',
    desc: 'Barra de cor no topo, layout organizado em seções',
    icon: '📄',
  },
  {
    id: 'moderno' as const,
    name: 'Moderno',
    desc: 'Sidebar escura com informações + área principal',
    icon: '🎨',
  },
  {
    id: 'bold' as const,
    name: 'Bold',
    desc: 'Header colorido de impacto e card de valor',
    icon: '⚡',
  },
  {
    id: 'minimal' as const,
    name: 'Minimal',
    desc: 'Ultra limpo, tipografia grande, bastante espaço',
    icon: '✨',
  },
  {
    id: 'executivo' as const,
    name: 'Executivo',
    desc: 'Corporativo com seções numeradas e bordas',
    icon: '🏛️',
  },
]

// ─── Sparkles icon (inline SVG) ─────────────────────────────────────────────

function SparklesIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  )
}

// ─── Component ──────────────────────────────────────────────────────────────

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
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CreateProposalInput>({
    resolver: zodResolver(CreateProposalSchema),
    defaultValues: {
      templateId: 'clean',
      ...defaultValues,
    },
  })

  const selectedTemplate = watch('templateId')

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

  const generateScopeMutation = trpc.proposals.generateScope.useMutation({
    onSuccess: (scope: string) => {
      setValue('scope', scope, { shouldValidate: true })
    },
  })

  function onSubmit(data: CreateProposalInput) {
    if (proposalId) {
      updateMutation.mutate({ id: proposalId, ...data })
    } else {
      createMutation.mutate(data)
    }
  }

  function handleGenerateScope() {
    const { clientName, title, valueInCents, scope } = getValues()
    if (!clientName || !title) {
      alert('Preencha o nome do cliente e o título antes de usar a IA.')
      return
    }
    generateScopeMutation.mutate({
      clientName,
      title,
      valueInCents: valueInCents || undefined,
      currentScope: scope || undefined,
    })
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              rows={6}
              error={!!errors.scope}
            />
          </Field>

          {/* AI button */}
          <button
            type="button"
            onClick={handleGenerateScope}
            disabled={generateScopeMutation.isPending}
            className="flex items-center gap-1.5 rounded-sm border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10 disabled:opacity-50"
          >
            {generateScopeMutation.isPending ? (
              <>
                <svg
                  className="h-3.5 w-3.5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" opacity="0.25" />
                  <path d="M4 12a8 8 0 0 1 8-8" opacity="1" />
                </svg>
                Gerando com IA...
              </>
            ) : (
              <>
                <SparklesIcon />
                {watch('scope') && watch('scope').length > 10
                  ? 'Melhorar com IA'
                  : 'Gerar escopo com IA'}
              </>
            )}
          </button>

          {generateScopeMutation.isError && (
            <p className="text-xs text-red-600">
              {generateScopeMutation.error.message === 'ANTHROPIC_API_KEY não configurada.'
                ? 'Recurso de IA não disponível. Entre em contato com o suporte.'
                : 'Erro ao gerar o escopo. Tente novamente.'}
            </p>
          )}
        </div>

        {/* Financial */}
        <div className="space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
            Valores e prazos
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

        {/* Template selector */}
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
            Template do PDF
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t) => (
              <label
                key={t.id}
                className={`flex cursor-pointer items-start gap-3 rounded-sm border p-4 transition-colors ${
                  selectedTemplate === t.id
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/40'
                }`}
              >
                <input
                  type="radio"
                  value={t.id}
                  {...register('templateId')}
                  className="mt-0.5 accent-accent"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{t.icon}</span>
                    <span className="text-sm font-medium text-fg-base">{t.name}</span>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-fg-muted">{t.desc}</p>
                </div>
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
