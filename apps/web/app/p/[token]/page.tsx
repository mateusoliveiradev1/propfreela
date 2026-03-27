import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/server/db'
import { proposalsService } from '@/server/services/proposals.service'
import { ProposalResponseButtons } from './ProposalResponseButtons'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

function formatCurrency(cents: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
}

export default async function PublicProposalPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  let proposal: Awaited<ReturnType<typeof proposalsService.getByPublicToken>>
  try {
    proposal = await proposalsService.getByPublicToken({ token, db })
  } catch {
    notFound()
  }

  const statusLabel: Record<string, string> = {
    aprovada: 'Aprovada',
    recusada: 'Recusada',
    enviada: 'Aguardando resposta',
    rascunho: 'Rascunho',
    em_revisao: 'Em revisão',
  }

  const statusColor: Record<string, string> = {
    aprovada: 'bg-green-100 text-green-800',
    recusada: 'bg-red-100 text-red-800',
    enviada: 'bg-yellow-100 text-yellow-800',
    rascunho: 'bg-gray-100 text-gray-700',
    em_revisao: 'bg-amber-100 text-amber-800',
  }

  const displayName = proposal.companyName || proposal.userName

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header bar */}
      <header className="border-b border-border bg-white/60 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl px-6 py-4 flex items-center gap-3">
          {proposal.logoUrl && proposal.userPlan === 'pro' && (
            <img src={proposal.logoUrl} alt={displayName ?? ''} className="h-8 w-auto object-contain" />
          )}
          <p className="text-sm font-medium text-fg-muted">
            Proposta de{' '}
            <span className="text-fg-base font-semibold">{displayName}</span>
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10">
        {/* Title + Status */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-fg-base">
            {proposal.title}
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <p className="text-sm text-fg-muted">
              Para: <span className="font-medium">{proposal.clientName}</span>
            </p>
            <span
              className={`inline-block rounded-sm px-2 py-0.5 text-xs font-medium ${statusColor[proposal.status] ?? ''}`}
            >
              {statusLabel[proposal.status] ?? proposal.status}
            </span>
          </div>
        </div>

        {/* Scope */}
        <section className="mb-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg-muted">
            Escopo do projeto
          </h2>
          <div className="whitespace-pre-wrap rounded-sm border-l-2 border-accent bg-bg-subtle p-4 text-sm leading-relaxed text-fg-base">
            {proposal.scope}
          </div>
        </section>

        {/* Investment */}
        <section className="mb-8 rounded-sm border border-border p-6">
          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                Investimento
              </h2>
              <p className="mt-1 text-3xl font-semibold text-accent">
                {formatCurrency(proposal.valueInCents)}
              </p>
            </div>
            <div className="text-right text-sm text-fg-muted">
              {proposal.deadline && (
                <p>
                  Prazo: <span className="font-medium text-fg-base">{proposal.deadline}</span>
                </p>
              )}
              {proposal.paymentTerms && (
                <p className="mt-1">
                  Pagamento: <span className="font-medium text-fg-base">{proposal.paymentTerms}</span>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Action buttons or read-only status */}
        {proposal.status === 'enviada' ? (
          <ProposalResponseButtons token={token} />
        ) : proposal.status === 'em_revisao' ? (
          <div className="rounded-sm border border-amber-200 bg-amber-50 p-6 text-center">
            <p className="text-sm text-amber-800">
              Você solicitou uma revisão desta proposta. O freelancer irá analisar seu feedback em breve.
            </p>
          </div>
        ) : (
          proposal.status !== 'rascunho' && (
            <div className="rounded-sm border border-border bg-bg-subtle p-6 text-center">
              <p className="text-sm text-fg-muted">
                Esta proposta foi{' '}
                <span className="font-semibold">
                  {proposal.status === 'aprovada' ? 'aprovada' : 'recusada'}
                </span>
                .
              </p>
            </div>
          )
        )}

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6 text-center text-xs text-fg-muted">
          Proposta gerada com PropFreela
        </footer>
      </main>
    </div>
  )
}
