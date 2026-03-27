import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/server/db'
import { proposals, users } from '@propfreela/db'
import { proposalsService } from '@/server/services/proposals.service'
import { rateLimit } from '@/lib/rate-limit'
import {
  sendProposalApprovedEmail,
  sendProposalRejectedEmail,
  sendRevisionRequestedEmail,
} from '@/server/services/email.service'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    const { success } = rateLimit({ key: `respond:${ip}`, limit: 20, windowMs: 60_000 })
    if (!success) {
      return NextResponse.json({ error: 'Muitas requisicoes. Tente novamente em um minuto.' }, { status: 429 })
    }

    const { token } = await params
    const body = (await request.json()) as { action?: string; feedback?: string }

    if (body.action !== 'aprovada' && body.action !== 'recusada' && body.action !== 'revisao') {
      return NextResponse.json(
        { error: 'Ação inválida.' },
        { status: 400 },
      )
    }

    const result = await proposalsService.respondByPublicToken({
      token,
      action: body.action,
      ...(body.feedback !== undefined && { feedback: body.feedback }),
      db,
    })

    // Send email notification to the proposal owner (fire-and-forget)
    try {
      const [row] = await db
        .select({ title: proposals.title, email: users.email })
        .from(proposals)
        .innerJoin(users, eq(proposals.userId, users.id))
        .where(eq(proposals.publicToken, token))
        .limit(1)

      if (row) {
        if (body.action === 'aprovada') {
          await sendProposalApprovedEmail(row.email, row.title)
        } else if (body.action === 'recusada') {
          await sendProposalRejectedEmail(row.email, row.title)
        } else {
          await sendRevisionRequestedEmail(row.email, row.title, body.feedback ?? '')
        }
      }
    } catch {}

    return NextResponse.json({ status: 'ok', newStatus: result.status })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno'
    const status = message === 'Proposta não encontrada' ? 404
      : message === 'Esta proposta já foi respondida' ? 409
      : 500
    return NextResponse.json({ error: message }, { status })
  }
}
