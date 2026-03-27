import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerCaller } from '@/lib/trpc/server'
import { formatCurrency } from '@/lib/currency'
import { ProposalStatusBadge } from '@/components/proposals/ProposalStatusBadge'

export const metadata: Metadata = { title: 'Propostas' }

function statusBorderClass(status: string) {
  switch (status) {
    case 'aprovada':   return 'border-l-emerald-400'
    case 'enviada':    return 'border-l-blue-400'
    case 'recusada':   return 'border-l-red-400'
    case 'em_revisao': return 'border-l-amber-400'
    default:           return 'border-l-border'
  }
}

export default async function PropostasPage() {
  const caller = await createServerCaller()
  const proposals = await caller.proposals.list({})

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
            Propostas
          </p>
          <h1 className="text-3xl font-light text-fg-base">
            {proposals.length} {proposals.length === 1 ? 'proposta' : 'propostas'}
          </h1>
        </div>
        <Link
          href="/nova-proposta"
          className="inline-flex h-10 items-center gap-2 rounded-sm bg-accent px-4 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
        >
          + Nova proposta
        </Link>
      </div>

      {proposals.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-sm border border-border py-16 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4 text-fg-placeholder"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          <p className="text-sm font-medium text-fg-base">Nenhuma proposta ainda</p>
          <p className="mt-1 text-xs text-fg-muted">
            Crie sua primeira proposta em menos de 2 minutos.
          </p>
          <Link
            href="/nova-proposta"
            className="mt-6 inline-flex h-9 items-center rounded-sm bg-accent px-5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Nova proposta
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-border rounded-sm border border-border">
          {proposals.map((proposal) => (
            <Link
              key={proposal.id}
              href={`/propostas/${proposal.id}`}
              className={`flex flex-col border-l-2 px-5 py-4 transition-colors hover:bg-bg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 ${statusBorderClass(proposal.status)}`}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-fg-base">
                  {proposal.title}
                </p>
                <p className="mt-0.5 text-xs text-fg-muted">{proposal.clientName}</p>
              </div>
              <div className="mt-1 flex flex-col items-end gap-1 sm:ml-8 sm:mt-0 sm:flex-row sm:items-center sm:gap-6">
                <span className="font-mono text-sm text-fg-base">
                  {formatCurrency(proposal.valueInCents)}
                </span>
                {proposal.viewCount > 0 && (
                  <span className="flex items-center gap-1 text-xs text-fg-placeholder">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    {proposal.viewCount}
                  </span>
                )}
                <ProposalStatusBadge status={proposal.status} />
                <span className="hidden text-xs text-fg-placeholder sm:block">
                  {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
