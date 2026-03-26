import { NextResponse } from 'next/server'
import { db } from '@/server/db'
import { proposalsService } from '@/server/services/proposals.service'
import { rateLimit } from '@/lib/rate-limit'

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
    const body = (await request.json()) as { action?: string }

    if (body.action !== 'aprovada' && body.action !== 'recusada') {
      return NextResponse.json(
        { error: 'Ação inválida. Use "aprovada" ou "recusada".' },
        { status: 400 },
      )
    }

    const result = await proposalsService.respondByPublicToken({
      token,
      action: body.action,
      db,
    })

    return NextResponse.json({ status: 'ok', newStatus: result.status })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno'
    const status = message === 'Proposta não encontrada' ? 404
      : message === 'Esta proposta já foi respondida' ? 409
      : 500
    return NextResponse.json({ error: message }, { status })
  }
}
