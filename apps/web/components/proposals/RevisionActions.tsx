'use client'

import Link from 'next/link'
import { useState } from 'react'
import { trpc } from '@/lib/trpc/client'

export function RevisionActions({ proposalId }: { proposalId: string }) {
  const [sent, setSent] = useState(false)

  const shareMutation = trpc.proposals.share.useMutation({
    onSuccess: async (data) => {
      await navigator.clipboard.writeText(data.url)
      setSent(true)
      setTimeout(() => setSent(false), 3000)
    },
  })

  return (
    <div className="mt-4 flex items-center gap-3 border-t border-amber-200 pt-4">
      <p className="mr-1 text-xs text-amber-700">Próximos passos:</p>
      <Link
        href={`/propostas/${proposalId}/editar`}
        className="rounded-sm border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-50"
      >
        1. Editar proposta
      </Link>
      <button
        onClick={() => shareMutation.mutate({ id: proposalId })}
        disabled={shareMutation.isPending}
        className="rounded-sm bg-amber-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-amber-700 disabled:opacity-50"
      >
        {shareMutation.isPending
          ? 'Gerando link...'
          : sent
            ? 'Link copiado!'
            : '2. Reenviar ao cliente'}
      </button>
    </div>
  )
}
