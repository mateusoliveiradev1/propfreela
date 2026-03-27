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

function TemplateThumbnail({ id }: { id: string }) {
  switch (id) {
    case 'clean':
      return (
        <div className="mb-2.5 h-10 w-full overflow-hidden rounded-sm border border-border/60 bg-bg-subtle flex flex-col">
          <div className="h-2 w-full bg-accent/40" />
          <div className="flex-1 p-1 space-y-0.5">
            <div className="h-0.5 w-3/4 rounded bg-fg-placeholder/40" />
            <div className="h-0.5 w-1/2 rounded bg-fg-placeholder/25" />
          </div>
        </div>
      )
    case 'moderno':
      return (
        <div className="mb-2.5 h-10 w-full overflow-hidden rounded-sm border border-border/60 flex">
          <div className="w-1/3 bg-fg-base/70" />
          <div className="flex-1 bg-bg-subtle p-1 space-y-0.5">
            <div className="h-0.5 w-3/4 rounded bg-fg-placeholder/40" />
            <div className="h-0.5 w-1/2 rounded bg-fg-placeholder/25" />
          </div>
        </div>
      )
    case 'bold':
      return (
        <div className="mb-2.5 h-10 w-full overflow-hidden rounded-sm border border-border/60 flex flex-col">
          <div className="h-4 w-full bg-accent/50 flex items-center px-1.5">
            <div className="h-1 w-8 rounded bg-white/50" />
          </div>
          <div className="flex-1 bg-bg-subtle p-1 space-y-0.5">
            <div className="h-0.5 w-1/2 rounded bg-fg-placeholder/40" />
          </div>
        </div>
      )
    case 'minimal':
      return (
        <div className="mb-2.5 h-10 w-full overflow-hidden rounded-sm border border-border/60 bg-bg-subtle p-1.5 space-y-1">
          <div className="h-1 w-2/3 rounded bg-fg-base/40" />
          <div className="h-0.5 w-full rounded bg-fg-placeholder/30" />
          <div className="h-0.5 w-4/5 rounded bg-fg-placeholder/20" />
        </div>
      )
    case 'executivo':
      return (
        <div className="mb-2.5 h-10 w-full overflow-hidden rounded-sm border border-border/60 bg-bg-subtle p-1 space-y-0.5">
          <div className="h-0.5 w-full rounded bg-fg-base/35" />
          <div className="flex h-2.5 gap-0.5">
            <div className="w-px bg-fg-placeholder/30" />
            <div className="flex-1 space-y-0.5 py-0.5">
              <div className="h-0.5 w-3/4 rounded bg-fg-placeholder/30" />
              <div className="h-0.5 w-1/2 rounded bg-fg-placeholder/20" />
            </div>
          </div>
          <div className="h-0.5 w-full rounded bg-fg-base/35" />
        </div>
      )
    default:
      return null
  }
}

const TEMPLATES = [
  {
    id: 'clean' as const,
    name: 'Clean',
    desc: 'Barra de cor no topo, layout organizado em seções',
  },
  {
    id: 'moderno' as const,
    name: 'Moderno',
    desc: 'Sidebar escura com informações + área principal',
  },
  {
    id: 'bold' as const,
    name: 'Bold',
    desc: 'Header colorido de impacto e card de valor',
  },
  {
    id: 'minimal' as const,
    name: 'Minimal',
    desc: 'Ultra limpo, tipografia grande, bastante espaço',
  },
  {
    id: 'executivo' as const,
    name: 'Executivo',
    desc: 'Corporativo com seções numeradas e bordas',
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

const VALIDITY_OPTIONS = [
  { label: 'Sem validade', days: null },
  { label: '7 dias', days: 7 },
  { label: '15 dias', days: 15 },
  { label: '30 dias', days: 30 },
] as const

type ValidityDays = null | 7 | 15 | 30

function initialValidityDays(expiresAt?: Date, isEditing?: boolean): ValidityDays {
  if (!expiresAt) return isEditing ? null : 15
  const days = Math.round((expiresAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000))
  if (days <= 8) return 7
  if (days <= 18) return 15
  return 30
}

type Props = {
  defaultValues?: Partial<CreateProposalInput>
  proposalId?: string // if set, update mode
  clientFeedback?: string // if set, AI will incorporate client revision request
}

export function ProposalForm({ defaultValues, proposalId, clientFeedback }: Props) {
  const router = useRouter()
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [validityDays, setValidityDays] = useState<ValidityDays>(() =>
    initialValidityDays(defaultValues?.expiresAt, !!proposalId),
  )

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
    const expiresAt =
      validityDays !== null
        ? new Date(Date.now() + validityDays * 24 * 60 * 60 * 1000)
        : undefined

    if (proposalId) {
      updateMutation.mutate({ id: proposalId, ...data, expiresAt })
    } else {
      createMutation.mutate({ ...data, expiresAt })
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
      clientFeedback: clientFeedback || undefined,
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
                {clientFeedback
                  ? 'Incorporar feedback do cliente'
                  : watch('scope') && watch('scope').length > 10
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

          {/* Validity */}
          <div>
            <p className="mb-2 text-sm text-fg-muted">Validade da proposta</p>
            <div className="flex flex-wrap gap-2">
              {VALIDITY_OPTIONS.map((opt) => (
                <button
                  key={String(opt.days)}
                  type="button"
                  onClick={() => setValidityDays(opt.days)}
                  className={`rounded-sm border px-3 py-1 text-xs font-medium transition-colors ${
                    validityDays === opt.days
                      ? 'border-accent bg-accent text-accent-fg'
                      : 'border-border text-fg-muted hover:border-accent/40 hover:text-fg-base'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {validityDays !== null && (
              <p className="mt-1.5 text-xs text-fg-muted">
                O cliente terá até{' '}
                {new Date(Date.now() + validityDays * 24 * 60 * 60 * 1000).toLocaleDateString(
                  'pt-BR',
                  { day: '2-digit', month: 'long', year: 'numeric' },
                )}{' '}
                para responder.
              </p>
            )}
          </div>
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
                className={`block cursor-pointer rounded-sm border p-3 transition-colors ${
                  selectedTemplate === t.id
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/40'
                }`}
              >
                <input
                  type="radio"
                  value={t.id}
                  {...register('templateId')}
                  className="sr-only"
                />
                <TemplateThumbnail id={t.id} />
                <span className="text-sm font-medium text-fg-base">{t.name}</span>
                <p className="mt-0.5 text-xs leading-relaxed text-fg-muted">{t.desc}</p>
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
