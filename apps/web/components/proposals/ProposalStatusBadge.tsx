'use client'

import { Badge, type BadgeVariant } from '@propfreela/ui'
import type { ProposalStatus } from '@propfreela/db'

const statusVariantMap: Record<ProposalStatus, BadgeVariant> = {
  rascunho: 'default',
  enviada: 'info',
  aprovada: 'success',
  recusada: 'danger',
  em_revisao: 'warning',
}

const statusLabelMap: Record<ProposalStatus, string> = {
  rascunho: 'Rascunho',
  enviada: 'Enviada',
  aprovada: 'Aprovada',
  recusada: 'Recusada',
  em_revisao: 'Em revisão',
}

export function ProposalStatusBadge({ status }: { status: ProposalStatus }) {
  return <Badge variant={statusVariantMap[status]}>{statusLabelMap[status]}</Badge>
}
