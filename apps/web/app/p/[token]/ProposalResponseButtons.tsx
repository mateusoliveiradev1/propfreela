'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'done'

export function ProposalResponseButtons({ token }: { token: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<'aprovada' | 'recusada' | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleRespond(action: 'aprovada' | 'recusada') {
    setStatus('loading')
    setError(null)

    try {
      const res = await fetch(`/api/proposals/${token}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? 'Erro ao responder')
      }

      setResult(action)
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao responder')
      setStatus('idle')
    }
  }

  if (status === 'done' && result) {
    return (
      <div className="rounded-sm border border-border bg-bg-subtle p-6 text-center">
        <div className="mb-2 text-2xl">
          {result === 'aprovada' ? '✓' : '✕'}
        </div>
        <p className="text-lg font-semibold text-fg">
          {result === 'aprovada' ? 'Proposta aprovada!' : 'Proposta recusada.'}
        </p>
        <p className="mt-1 text-sm text-fg-muted">
          {result === 'aprovada'
            ? 'O freelancer será notificado sobre sua aprovação.'
            : 'O freelancer será notificado sobre sua decisão.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      <div className="flex gap-3">
        <button
          onClick={() => handleRespond('aprovada')}
          disabled={status === 'loading'}
          className="flex-1 rounded-sm bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
        >
          {status === 'loading' ? 'Enviando...' : 'Aprovar proposta'}
        </button>
        <button
          onClick={() => handleRespond('recusada')}
          disabled={status === 'loading'}
          className="flex-1 rounded-sm border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:bg-bg-subtle disabled:opacity-50"
        >
          Recusar
        </button>
      </div>
    </div>
  )
}
