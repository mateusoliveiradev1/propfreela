import type { Metadata } from 'next'
import { ProposalForm } from '@/components/proposals/ProposalForm'

export const metadata: Metadata = { title: 'Nova proposta' }

export default function NovaProposta() {
  return (
    <div className="px-10 py-10">
      <div className="mb-10">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
          Nova proposta
        </p>
        <h1 className="text-3xl font-light text-fg-base">Criar proposta</h1>
      </div>
      <div className="max-w-2xl">
        <ProposalForm />
      </div>
    </div>
  )
}
