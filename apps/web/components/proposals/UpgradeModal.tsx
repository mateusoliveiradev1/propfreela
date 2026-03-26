'use client'

import { Button } from '@propfreela/ui'
import { trpc } from '@/lib/trpc/client'

export function UpgradeModal({ onClose }: { onClose: () => void }) {
  const monthly = trpc.user.createCheckoutSession.useMutation({
    onSuccess: (data) => { window.location.href = data.url },
  })
  const yearly = trpc.user.createCheckoutSession.useMutation({
    onSuccess: (data) => { window.location.href = data.url },
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-fg-base/30 backdrop-blur-sm">
      <div className="w-full max-w-sm space-y-6 rounded-sm bg-bg-base p-8 shadow-lg">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
            Plano gratuito
          </p>
          <h2 className="text-xl font-light text-fg-base">
            Você usou suas 3 propostas grátis este mês
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            Faça upgrade para criar propostas ilimitadas, remover o watermark e adicionar sua logo.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => monthly.mutate({ interval: 'month' })}
            loading={monthly.isPending}
            className="w-full"
          >
            R$29/mês — Assinar Pro
          </Button>
          <Button
            variant="ghost"
            onClick={() => yearly.mutate({ interval: 'year' })}
            loading={yearly.isPending}
            className="w-full"
          >
            R$197/ano — economize 44%
          </Button>
          <button
            onClick={onClose}
            className="w-full text-center text-xs text-fg-placeholder hover:text-fg-muted"
          >
            Continuar no plano gratuito
          </button>
        </div>
      </div>
    </div>
  )
}
