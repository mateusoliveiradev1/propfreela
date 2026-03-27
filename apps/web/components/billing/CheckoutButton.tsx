'use client'

import { useState } from 'react'
import { trpc } from '@/lib/trpc/client'

type Interval = 'month' | 'year'

export function CheckoutButton({
  interval = 'month',
  className,
  children,
}: {
  interval?: Interval
  className?: string
  children?: React.ReactNode
}) {
  const [selected, setSelected] = useState<Interval>(interval)

  const checkout = trpc.user.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      window.location.href = data.url
    },
  })

  return (
    <div className="space-y-3">
      {/* Interval toggle */}
      <div className="flex rounded-sm border border-border text-xs">
        <button
          onClick={() => setSelected('month')}
          className={`flex-1 px-3 py-2 transition-colors ${
            selected === 'month'
              ? 'bg-accent text-accent-fg font-medium'
              : 'text-fg-muted hover:bg-bg-subtle'
          }`}
        >
          Mensal — R$29
        </button>
        <button
          onClick={() => setSelected('year')}
          className={`flex-1 px-3 py-2 transition-colors ${
            selected === 'year'
              ? 'bg-accent text-accent-fg font-medium'
              : 'text-fg-muted hover:bg-bg-subtle'
          }`}
        >
          Anual — R$197
        </button>
      </div>

      <button
        onClick={() => checkout.mutate({ interval: selected })}
        disabled={checkout.isPending}
        className={
          className ??
          'inline-flex h-10 w-full items-center justify-center rounded-sm bg-accent text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-60'
        }
      >
        {checkout.isPending ? 'Redirecionando...' : (children ?? 'Assinar Pro')}
      </button>

      {checkout.isError && (
        <p className="text-xs text-red-500">
          {checkout.error.message ?? 'Erro ao iniciar checkout. Tente novamente.'}
        </p>
      )}
    </div>
  )
}
