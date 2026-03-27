import type { Metadata } from 'next'
import { ConfiguracoesForm } from '@/components/settings/ConfiguracoesForm'
import { CancelPlanButton } from '@/components/settings/CancelPlanButton'
import { CheckoutButton } from '@/components/billing/CheckoutButton'
import { createServerCaller } from '@/lib/trpc/server'

export const metadata: Metadata = { title: 'Configurações' }

export default async function ConfiguracoesPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>
}) {
  const { success } = await searchParams
  const caller = await createServerCaller()
  const [user, proposalCount] = await Promise.all([
    caller.user.getMe(),
    caller.user.getProposalCount(),
  ])

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mb-10">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
          Configurações
        </p>
        <h1 className="text-3xl font-light text-fg-base">Sua conta</h1>
      </div>

      {success && (
        <div className="mb-8 rounded-sm border border-accent/30 bg-accent/5 px-5 py-4">
          <p className="text-sm text-accent">
            Upgrade realizado com sucesso. Bem-vindo ao plano Pro!
          </p>
        </div>
      )}

      <div className="max-w-2xl space-y-12">
        {/* Plan info */}
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
            Plano atual
          </p>
          <div className="rounded-sm border border-border p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-fg-base">
                    {user.plan === 'free' ? 'Plano Gratuito' : 'Plano Pro'}
                  </p>
                  {user.plan === 'pro' && (
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                      Pro
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-fg-muted">
                  {user.plan === 'free'
                    ? `${proposalCount.thisMonth} de 3 propostas usadas este mês`
                    : 'Propostas ilimitadas • sem watermark • logo própria'}
                </p>
              </div>
              {user.plan === 'free' ? (
                <UpgradeButton />
              ) : (
                <CancelPlanButton />
              )}
            </div>
            {user.plan === 'free' && (
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-subtle">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${Math.min(100, (proposalCount.thisMonth / 3) * 100)}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Profile form */}
        <ConfiguracoesForm
          defaultValues={{
            companyName: user.companyName ?? '',
            accentColor: user.accentColor ?? '#1A472A',
            logoUrl: user.logoUrl ?? null,
          }}
          isPro={user.plan === 'pro'}
        />
      </div>
    </div>
  )
}

function UpgradeButton() {
  return <CheckoutButton />
}
