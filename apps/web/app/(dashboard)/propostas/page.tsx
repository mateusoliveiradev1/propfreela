import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerCaller } from '@/lib/trpc/server'
import { formatCurrency } from '@/lib/currency'
import { ProposalStatusBadge } from '@/components/proposals/ProposalStatusBadge'

export const metadata: Metadata = { title: 'Propostas' }

export default async function PropostasPage() {
  const caller = await createServerCaller()
  const proposals = await caller.proposals.list({})

  return (
    <div className="px-10 py-10">
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
        <div className="rounded-sm border border-border bg-bg-subtle p-12 text-center">
          <p className="text-sm text-fg-muted">Nenhuma proposta criada ainda.</p>
        </div>
      ) : (
        <div className="divide-y divide-border rounded-sm border border-border">
          {proposals.map((proposal) => (
            <Link
              key={proposal.id}
              href={`/propostas/${proposal.id}`}
              className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-bg-subtle"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-fg-base">
                  {proposal.title}
                </p>
                <p className="mt-0.5 text-xs text-fg-muted">{proposal.clientName}</p>
              </div>
              <div className="ml-8 flex shrink-0 items-center gap-6">
                <span className="font-mono text-sm text-fg-base">
                  {formatCurrency(proposal.valueInCents)}
                </span>
                <ProposalStatusBadge status={proposal.status} />
                <span className="text-xs text-fg-placeholder">
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
