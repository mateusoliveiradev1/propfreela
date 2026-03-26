'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@propfreela/ui'
import { trpc } from '@/lib/trpc/client'
import type { Proposal } from '@propfreela/db'

export function ProposalActions({ proposal }: { proposal: Proposal }) {
  const router = useRouter()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  const deleteMutation = trpc.proposals.delete.useMutation({
    onSuccess: () => router.push('/propostas'),
  })

  const duplicateMutation = trpc.proposals.duplicate.useMutation({
    onSuccess: (p) => router.push(`/propostas/${p.id}`),
  })

  const shareMutation = trpc.proposals.share.useMutation({
    onSuccess: async (data) => {
      await navigator.clipboard.writeText(data.url)
      setShareCopied(true)
      setTimeout(() => setShareCopied(false), 2000)
    },
  })

  function handleDownloadPdf() {
    const a = document.createElement('a')
    a.href = `/api/pdf/${proposal.id}`
    a.download = `proposta-${proposal.clientName.toLowerCase().replace(/\s+/g, '-')}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="ghost" size="sm" onClick={handleDownloadPdf}>
        Baixar PDF
      </Button>
      <Button
        variant="ghost"
        size="sm"
        loading={shareMutation.isPending}
        onClick={() => shareMutation.mutate({ id: proposal.id })}
      >
        {shareCopied ? 'Link copiado!' : 'Compartilhar'}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(`/propostas/${proposal.id}/editar`)}
      >
        Editar
      </Button>
      <Button
        variant="ghost"
        size="sm"
        loading={duplicateMutation.isPending}
        onClick={() => duplicateMutation.mutate({ id: proposal.id })}
      >
        Duplicar
      </Button>
      {confirmDelete ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-fg-muted">Tem certeza?</span>
          <Button
            variant="destructive"
            size="sm"
            loading={deleteMutation.isPending}
            onClick={() => deleteMutation.mutate({ id: proposal.id })}
          >
            Confirmar
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)}>
            Cancelar
          </Button>
        </div>
      ) : (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setConfirmDelete(true)}
        >
          Excluir
        </Button>
      )}
    </div>
  )
}
