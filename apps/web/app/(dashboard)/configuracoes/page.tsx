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
  const user = await caller.user.getMe()

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
          <div className="flex items-center justify-between rounded-sm border border-border p-5">
            <div>
              <p className="text-sm font-medium text-fg-base capitalize">{user.plan}</p>
              <p className="mt-0.5 text-xs text-fg-muted">
                {user.plan === 'free'
                  ? '3 propostas por mês • watermark no PDF'
                  : 'Propostas ilimitadas • sem watermark • logo própria'}
              </p>
            </div>
            {user.plan === 'free' ? (
              <UpgradeButton />
            ) : (
              <CancelPlanButton />
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
