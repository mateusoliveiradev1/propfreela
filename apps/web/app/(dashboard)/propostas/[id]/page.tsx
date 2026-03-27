import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createServerCaller } from '@/lib/trpc/server'
import { formatCurrency } from '@/lib/currency'
import { ProposalStatusBadge } from '@/components/proposals/ProposalStatusBadge'
import { ProposalActions } from '@/components/proposals/ProposalActions'
import { RevisionActions } from '@/components/proposals/RevisionActions'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const caller = await createServerCaller()
  try {
    const proposal = await caller.proposals.getById({ id })
    return { title: proposal.title }
  } catch {
    return { title: 'Proposta' }
  }
}

export default async function ProposalDetailPage({ params }: Props) {
  const { id } = await params
  const caller = await createServerCaller()

  let proposal
  try {
    proposal = await caller.proposals.getById({ id })
  } catch {
    notFound()
  }


  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      {/* Back */}
      <Link
        href="/propostas"
        className="mb-8 inline-flex text-xs text-fg-muted hover:text-fg-base"
      >
        ← Voltar para propostas
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
            {proposal.clientName}
          </p>
          <h1 className="text-3xl font-light text-fg-base">{proposal.title}</h1>
          <div className="mt-3 flex items-center gap-3">
            <ProposalStatusBadge status={proposal.status} />
            <span className="text-xs text-fg-placeholder">
              {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>

        <ProposalActions proposal={proposal} />
      </div>

      {proposal.status === 'em_revisao' && proposal.clientFeedback && (
        <div className="mt-8 rounded-sm border border-amber-200 bg-amber-50 p-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-amber-700">
            Feedback do cliente
          </p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-amber-900">
            {proposal.clientFeedback}
          </p>
          <RevisionActions proposalId={proposal.id} />
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Section label="Escopo do projeto">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-fg-muted">
              {proposal.scope}
            </p>
          </Section>

          {proposal.paymentTerms && (
            <Section label="Condições de pagamento">
              <p className="text-sm text-fg-muted">{proposal.paymentTerms}</p>
            </Section>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-sm border border-accent/20 bg-accent/3 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
              Investimento
            </p>
            <p className="font-mono text-2xl font-light text-accent">
              {formatCurrency(proposal.valueInCents)}
            </p>
          </div>

          {proposal.deadline && (
            <div className="rounded-sm border border-border p-5">
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
                Prazo
              </p>
              <p className="text-sm text-fg-base">
                {new Date(proposal.deadline).toLocaleDateString('pt-BR')}
              </p>
            </div>
          )}

          <div className="rounded-sm border border-border p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
              Template
            </p>
            <p className="text-sm capitalize text-fg-base">{proposal.templateId}</p>
          </div>

          <div className="rounded-sm border border-border p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
              Visualizações
            </p>
            {proposal.viewCount > 0 ? (
              <>
                <p className="text-2xl font-light text-fg-base">{proposal.viewCount}</p>
                {proposal.lastViewedAt && (
                  <p className="mt-1 text-xs text-fg-muted">
                    Última visita{' '}
                    {new Date(proposal.lastViewedAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                    })}{' '}
                    às{' '}
                    {new Date(proposal.lastViewedAt).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-fg-placeholder">Ainda não foi vista</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
        {label}
      </p>
      {children}
    </div>
  )
}
