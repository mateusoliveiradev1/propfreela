import type { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@/auth'
import { createServerCaller } from '@/lib/trpc/server'
import { formatCurrency } from '@/lib/currency'
import { ProposalStatusBadge } from '@/components/proposals/ProposalStatusBadge'

export const metadata: Metadata = { title: 'Início — PropFreela' }

export default async function DashboardPage() {
  const session = await auth()
  const caller = await createServerCaller()

  const [proposals, proposalCount] = await Promise.all([
    caller.proposals.list({}),
    caller.user.getProposalCount(),
  ])

  const recent = proposals.slice(0, 5)
  const totalValueCents = proposals.reduce((sum, p) => sum + p.valueInCents, 0)
  const approved = proposals.filter((p) => p.status === 'aprovada').length

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
          Dashboard
        </p>
        <h1 className="text-3xl font-light text-fg-base">
          Olá, {session?.user.name?.split(' ')[0]}
        </h1>
      </div>

      {/* Metrics */}
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <MetricCard
          label="Propostas este mês"
          value={`${proposalCount.thisMonth} / ${proposalCount.remaining + proposalCount.thisMonth}`}
          sub={`${proposalCount.remaining} restantes`}
        />
        <MetricCard
          label="Valor total"
          value={formatCurrency(totalValueCents)}
          sub={`${proposals.length} propostas`}
        />
        <MetricCard
          label="Aprovadas"
          value={String(approved)}
          sub={
            proposals.length > 0
              ? `${Math.round((approved / proposals.length) * 100)}% de conversão`
              : '—'
          }
        />
      </div>

      {/* Recent proposals */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-fg-base">Propostas recentes</h2>
          <Link href="/nova-proposta" className="text-xs font-medium text-accent hover:underline">
            + Nova proposta
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="rounded-sm border border-border p-10">
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-sm bg-accent/10">
                <span className="text-xl">✎</span>
              </div>
              <h3 className="mb-2 text-base font-medium text-fg-base">
                Crie sua primeira proposta
              </h3>
              <p className="mb-8 text-sm text-fg-muted">
                Em menos de 2 minutos você tem um PDF profissional pronto para enviar ao cliente.
              </p>
              <div className="mb-8 grid grid-cols-3 gap-4 text-left">
                {[
                  { n: '01', title: 'Preencha os dados', desc: 'Cliente, valor e prazo.' },
                  { n: '02', title: 'IA gera o escopo', desc: 'Edite se quiser.' },
                  { n: '03', title: 'Baixe o PDF', desc: 'Escolha o template.' },
                ].map((step) => (
                  <div key={step.n} className="space-y-1">
                    <span className="font-mono text-xs font-medium text-accent">{step.n}</span>
                    <p className="text-xs font-medium text-fg-base">{step.title}</p>
                    <p className="text-xs text-fg-muted">{step.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/nova-proposta"
                className="inline-flex h-10 items-center rounded-sm bg-accent px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
              >
                Criar primeira proposta
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border rounded-sm border border-border">
            {recent.map((proposal) => (
              <Link
                key={proposal.id}
                href={`/propostas/${proposal.id}`}
                className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-bg-subtle"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-fg-base">{proposal.title}</p>
                  <p className="text-xs text-fg-muted">{proposal.clientName}</p>
                </div>
                <div className="ml-6 flex shrink-0 items-center gap-4">
                  <span className="font-mono text-sm text-fg-base">
                    {formatCurrency(proposal.valueInCents)}
                  </span>
                  <ProposalStatusBadge status={proposal.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-sm border border-border bg-bg-base p-6">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
        {label}
      </p>
      <p className="font-mono text-2xl font-light text-fg-base">{value}</p>
      <p className="mt-1 text-xs text-fg-placeholder">{sub}</p>
    </div>
  )
}
