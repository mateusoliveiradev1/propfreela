'use client'

import { useState } from 'react'

type Status = 'idle' | 'revision_open' | 'loading' | 'done'
type Result = 'aprovada' | 'recusada' | 'revisao'

export function ProposalResponseButtons({ token }: { token: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<Result | null>(null)
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleRespond(action: Result) {
    if (action === 'revisao' && !feedback.trim()) {
      setError('Descreva o que precisa ser revisado.')
      return
    }

    setStatus('loading')
    setError(null)

    try {
      const res = await fetch(`/api/proposals/${token}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, feedback: action === 'revisao' ? feedback.trim() : undefined }),
      })

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? 'Erro ao responder')
      }

      setResult(action)
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao responder')
      setStatus(action === 'revisao' ? 'revision_open' : 'idle')
    }
  }

  if (status === 'done' && result) {
    return (
      <div className="rounded-sm border border-border bg-bg-subtle p-6 text-center">
        <div className="mb-2 text-2xl">
          {result === 'aprovada' ? '✓' : result === 'recusada' ? '✕' : '↩'}
        </div>
        <p className="text-lg font-semibold text-fg-base">
          {result === 'aprovada'
            ? 'Proposta aprovada!'
            : result === 'recusada'
              ? 'Proposta recusada.'
              : 'Revisão solicitada.'}
        </p>
        <p className="mt-1 text-sm text-fg-muted">
          {result === 'aprovada'
            ? 'O freelancer será notificado sobre sua aprovação.'
            : result === 'recusada'
              ? 'O freelancer será notificado sobre sua decisão.'
              : 'O freelancer irá analisar seu feedback e enviará uma nova versão em breve.'}
        </p>
      </div>
    )
  }

  if (status === 'revision_open' || (status === 'loading' && result === null && feedback !== '')) {
    return (
      <div className="space-y-3">
        {error && <p className="text-sm text-red-600">{error}</p>}
        <p className="text-sm font-medium text-fg-base">O que precisa ser revisado?</p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Ex: Gostaria de ajustar o valor e incluir suporte por 3 meses no escopo..."
          rows={4}
          className="w-full resize-none rounded-sm border border-border bg-bg-base px-4 py-3 text-sm text-fg-base placeholder:text-fg-placeholder focus:border-accent focus:outline-none"
          disabled={status === 'loading'}
        />
        <div className="flex gap-3">
          <button
            onClick={() => handleRespond('revisao')}
            disabled={status === 'loading'}
            className="flex-1 rounded-sm bg-amber-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700 disabled:opacity-50"
          >
            {status === 'loading' ? 'Enviando...' : 'Enviar feedback'}
          </button>
          <button
            onClick={() => { setStatus('idle'); setError(null) }}
            disabled={status === 'loading'}
            className="rounded-sm border border-border px-4 py-3 text-sm text-fg-muted transition-colors hover:bg-bg-subtle disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => handleRespond('aprovada')}
          disabled={status === 'loading'}
          className="flex-1 rounded-sm bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
        >
          {status === 'loading' ? 'Enviando...' : 'Aprovar proposta'}
        </button>
        <button
          onClick={() => setStatus('revision_open')}
          disabled={status === 'loading'}
          className="flex-1 rounded-sm border border-amber-300 bg-amber-50 px-6 py-3 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100 disabled:opacity-50"
        >
          Solicitar revisão
        </button>
        <button
          onClick={() => handleRespond('recusada')}
          disabled={status === 'loading'}
          className="flex-1 rounded-sm border border-border px-6 py-3 text-sm font-medium text-fg-muted transition-colors hover:bg-bg-subtle disabled:opacity-50"
        >
          Recusar
        </button>
      </div>
    </div>
  )
}
