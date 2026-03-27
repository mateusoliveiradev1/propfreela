import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { createServerCaller } from '@/lib/trpc/server'
import { AdminUsersTable } from '@/components/admin/AdminUsersTable'

export const metadata: Metadata = { title: 'Admin — PropFreela' }

export default async function AdminPage() {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    redirect('/dashboard')
  }

  const caller = await createServerCaller()
  const [stats, allUsers, signupHistory] = await Promise.all([
    caller.admin.getStats(),
    caller.admin.getAllUsers(),
    caller.admin.getSignupHistory(),
  ])

  return (
    <div className="px-6 py-8 md:px-10 md:py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
          Painel de administração
        </p>
        <h1 className="text-3xl font-light text-fg-base">Admin</h1>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-5">
        <StatCard label="Total de usuários" value={String(stats.totalUsers)} />
        <StatCard
          label="Plano pro"
          value={String(stats.proUsers)}
          sub={stats.totalUsers > 0 ? `${Math.round((stats.proUsers / stats.totalUsers) * 100)}%` : '—'}
        />
        <StatCard
          label="Plano grátis"
          value={String(stats.freeUsers)}
        />
        <StatCard label="Total de propostas" value={String(stats.totalProposals)} />
        <StatCard
          label="MRR"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.mrrInCents / 100)}
          sub="receita mensal recorrente"
        />
      </div>

      {/* Signup chart */}
      <div className="mb-10 rounded-sm border border-border bg-bg-base p-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
          Cadastros — últimos 30 dias
        </p>
        <SignupChart data={signupHistory} />
      </div>

      {/* Users Table */}
      <div>
        <h2 className="mb-4 text-sm font-medium text-fg-base">Usuários</h2>
        {allUsers.length === 0 ? (
          <p className="text-sm text-fg-muted">Nenhum usuário cadastrado ainda.</p>
        ) : (
          <AdminUsersTable
            initialUsers={allUsers.map((u) => ({
              ...u,
              plan: u.plan as 'free' | 'pro',
              role: (u.role ?? 'user') as 'user' | 'admin',
              proposalCount: u.proposalCount ?? 0,
              lastLoginAt: u.lastLoginAt ?? null,
            }))}
          />
        )}
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="rounded-sm border border-border bg-bg-base p-5">
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
        {label}
      </p>
      <p className="font-mono text-2xl font-light text-fg-base">{value}</p>
      {sub && <p className="mt-1 text-xs text-fg-placeholder">{sub}</p>}
    </div>
  )
}

function SignupChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1)
  const total = data.reduce((s, d) => s + d.count, 0)
  const BAR_H = 64

  // Show labels every 7 days
  const labelIndices = [0, 7, 14, 21, data.length - 1]

  function formatLabel(dateStr: string) {
    const [, m, d] = dateStr.split('-')
    return `${d}/${m}`
  }

  return (
    <div>
      {/* Summary */}
      <div className="mb-3 flex items-baseline gap-3">
        <span className="font-mono text-lg font-light text-fg-base">{total}</span>
        <span className="text-xs text-fg-muted">
          cadastro{total !== 1 ? 's' : ''} no período
        </span>
      </div>

      {/* Bars */}
      <div className="flex items-end gap-px" style={{ height: `${BAR_H}px` }}>
        {data.map((d) => {
          const h = d.count > 0 ? Math.max(Math.round((d.count / max) * BAR_H), 4) : 1
          return (
            <div
              key={d.date}
              title={`${formatLabel(d.date)}: ${d.count} cadastro${d.count !== 1 ? 's' : ''}`}
              className="relative flex-1 group"
              style={{ height: `${BAR_H}px` }}
            >
              <div
                style={{ height: `${h}px` }}
                className={`absolute bottom-0 left-0 right-0 rounded-[1px] transition-colors ${
                  d.count > 0
                    ? 'bg-accent/70 group-hover:bg-accent'
                    : 'bg-border'
                }`}
              />
              {/* Show count on hover when > 0 */}
              {d.count > 0 && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 hidden group-hover:block font-mono text-[10px] text-accent">
                  {d.count}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Date labels */}
      <div className="mt-1.5 flex">
        {data.map((d, i) => (
          <div key={d.date} className="flex-1 text-center">
            {labelIndices.includes(i) && (
              <span className="text-[10px] text-fg-placeholder">{formatLabel(d.date)}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
