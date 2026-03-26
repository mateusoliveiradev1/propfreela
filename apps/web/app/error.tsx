'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[PropFreela Error]', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
          Erro inesperado
        </p>
        <h1 className="text-3xl font-light text-fg-base">Algo deu errado</h1>
        <p className="text-sm text-fg-muted">
          Ocorreu um erro ao carregar esta pagina. Tente novamente ou volte ao inicio.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex h-10 items-center rounded-sm bg-accent px-5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex h-10 items-center rounded-sm border border-border px-5 text-sm text-fg-base transition-colors hover:bg-bg-subtle"
          >
            Voltar ao inicio
          </a>
        </div>
      </div>
    </div>
  )
}
