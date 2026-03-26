'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '@/lib/trpc/client'

export function CancelPlanButton() {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)

  const cancel = trpc.user.cancelSubscription.useMutation({
    onSuccess: () => {
      router.refresh()
    },
  })

  if (confirming) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-fg-muted">Tem certeza?</span>
        <button
          onClick={() => cancel.mutate()}
          disabled={cancel.isPending}
          className="rounded-sm border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
        >
          {cancel.isPending ? 'Cancelando...' : 'Confirmar cancelamento'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-sm border border-border px-3 py-1.5 text-xs text-fg-muted transition-colors hover:bg-bg-subtle"
        >
          Voltar
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs text-fg-placeholder underline transition-colors hover:text-fg-muted"
    >
      Cancelar assinatura
    </button>
  )
}
