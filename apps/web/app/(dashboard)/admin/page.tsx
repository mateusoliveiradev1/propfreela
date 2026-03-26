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
  const [stats, allUsers] = await Promise.all([
    caller.admin.getStats(),
    caller.admin.getAllUsers(),
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
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
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
