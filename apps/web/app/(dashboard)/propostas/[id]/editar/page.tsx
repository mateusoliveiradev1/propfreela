import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createServerCaller } from '@/lib/trpc/server'
import { ProposalForm } from '@/components/proposals/ProposalForm'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const caller = await createServerCaller()
  try {
    const proposal = await caller.proposals.getById({ id })
    return { title: `Editar — ${proposal.title}` }
  } catch {
    return { title: 'Editar proposta' }
  }
}

export default async function EditarPropostaPage({ params }: Props) {
  const { id } = await params
  const caller = await createServerCaller()

  let proposal
  try {
    proposal = await caller.proposals.getById({ id })
  } catch {
    notFound()
  }

  return (
    <div className="px-10 py-10">
      <Link
        href={`/propostas/${id}`}
        className="mb-8 inline-flex text-xs text-fg-muted hover:text-fg-base"
      >
        ← Voltar para proposta
      </Link>

      <div className="mb-10">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
          Editar proposta
        </p>
        <h1 className="text-3xl font-light text-fg-base">{proposal.title}</h1>
      </div>

      <div className="max-w-2xl">
        <ProposalForm
          proposalId={proposal.id}
          {...(proposal.clientFeedback != null ? { clientFeedback: proposal.clientFeedback } : {})}
          defaultValues={{
            title: proposal.title,
            clientName: proposal.clientName,
            clientEmail: proposal.clientEmail ?? undefined,
            scope: proposal.scope,
            valueInCents: proposal.valueInCents,
            deadline: proposal.deadline ?? undefined,
            paymentTerms: proposal.paymentTerms ?? undefined,
            templateId: proposal.templateId as 'clean' | 'moderno',
            expiresAt: proposal.expiresAt ?? undefined,
          }}
        />
      </div>
    </div>
  )
}
