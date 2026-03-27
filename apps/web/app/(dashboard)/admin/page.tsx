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
  const BAR_H = 60

  return (
    <div className="flex items-end gap-px h-[60px] w-full">
      {data.map((d) => {
        const h = d.count > 0 ? Math.max(Math.round((d.count / max) * BAR_H), 4) : 1
        return (
          <div
            key={d.date}
            title={`${d.date}: ${d.count} cadastro${d.count !== 1 ? 's' : ''}`}
            style={{ height: `${h}px` }}
            className={`flex-1 rounded-[1px] ${d.count > 0 ? 'bg-accent' : 'bg-border'}`}
          />
        )
      })}
    </div>
  )
}
