'use client'

import { useRouter } from 'next/navigation'
import { trpc } from '@/lib/trpc/client'

type AdminUser = {
  id: string
  email: string
  name: string
  plan: 'free' | 'pro'
  role: 'user' | 'admin'
  proposalCount: number
  createdAt: Date
  lastLoginAt: Date | null
}

export function AdminUsersTable({ initialUsers }: { initialUsers: AdminUser[] }) {
  const router = useRouter()
  const setPlan = trpc.admin.setPlan.useMutation({
    onSuccess: () => router.refresh(),
  })

  return (
    <>
      {/* ── Mobile: card list ────────────────────────────────────────── */}
      <div className="space-y-3 md:hidden">
        {initialUsers.map((user) => (
          <div key={user.id} className="rounded-sm border border-border bg-bg-base p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-fg-base">{user.name}</p>
                <p className="truncate text-xs text-fg-muted">{user.email}</p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-1.5">
                <span
                  className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium ${
                    user.plan === 'pro'
                      ? 'border-accent/30 bg-accent/10 text-accent'
                      : 'border-border bg-bg-subtle text-fg-muted'
                  }`}
                >
                  {user.plan === 'pro' ? 'Pro' : 'Grátis'}
                </span>
                {user.role === 'admin' && (
                  <span className="inline-flex items-center rounded-sm border border-border bg-bg-overlay px-1.5 py-0.5 text-[10px] text-fg-placeholder">
                    admin
                  </span>
                )}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-fg-muted">
                {user.proposalCount} proposta{user.proposalCount !== 1 ? 's' : ''} ·{' '}
                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                {user.lastLoginAt && (
                  <> · acesso {new Date(user.lastLoginAt).toLocaleDateString('pt-BR')}</>
                )}
              </p>
              {user.role !== 'admin' && (
                <button
                  onClick={() =>
                    setPlan.mutate({
                      userId: user.id,
                      plan: user.plan === 'pro' ? 'free' : 'pro',
                    })
                  }
                  disabled={setPlan.isPending}
                  className="rounded-sm border border-border px-2.5 py-1 text-xs text-fg-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
                >
                  {user.plan === 'pro' ? '→ Grátis' : '→ Pro'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop: table ───────────────────────────────────────────── */}
      <div className="hidden overflow-x-auto rounded-sm border border-border md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-subtle">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.1em] text-fg-muted">
                Usuário
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.1em] text-fg-muted">
                Plano
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.1em] text-fg-muted">
                Propostas
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.1em] text-fg-muted">
                Cadastro
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.1em] text-fg-muted">
                Último acesso
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.1em] text-fg-muted">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {initialUsers.map((user) => (
              <tr key={user.id} className="transition-colors hover:bg-bg-subtle">
                <td className="px-4 py-3">
                  <p className="font-medium text-fg-base">{user.name}</p>
                  <p className="text-xs text-fg-muted">{user.email}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium ${
                      user.plan === 'pro'
                        ? 'border-accent/30 bg-accent/10 text-accent'
                        : 'border-border bg-bg-subtle text-fg-muted'
                    }`}
                  >
                    {user.plan === 'pro' ? 'Pro' : 'Grátis'}
                  </span>
                  {user.role === 'admin' && (
                    <span className="ml-1.5 inline-flex items-center rounded-sm border border-border bg-bg-overlay px-1.5 py-0.5 text-[10px] text-fg-placeholder">
                      admin
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-sm text-fg-base">
                  {user.proposalCount}
                </td>
                <td className="px-4 py-3 text-xs text-fg-muted">
                  {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-4 py-3 text-xs text-fg-muted">
                  {user.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleDateString('pt-BR')
                    : '—'}
                </td>
                <td className="px-4 py-3">
                  {user.role !== 'admin' && (
                    <button
                      onClick={() =>
                        setPlan.mutate({
                          userId: user.id,
                          plan: user.plan === 'pro' ? 'free' : 'pro',
                        })
                      }
                      disabled={setPlan.isPending}
                      className="rounded-sm border border-border px-2.5 py-1 text-xs text-fg-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
                    >
                      {user.plan === 'pro' ? '→ Grátis' : '→ Pro'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
