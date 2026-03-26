import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/server/db'
import { generatePdf } from '@propfreela/pdf'
import { proposals, users } from '@propfreela/db'
import { eq, and } from 'drizzle-orm'
import { rateLimit } from '@/lib/rate-limit'

type Params = { params: Promise<{ proposalId: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const ip = _req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const { success } = rateLimit({ key: `pdf:${ip}`, limit: 10, windowMs: 60_000 })
  if (!success) {
    return NextResponse.json({ error: 'Muitas requisicoes. Tente novamente em um minuto.' }, { status: 429 })
  }

  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { proposalId } = await params

  const [proposal] = await db
    .select()
    .from(proposals)
    .where(and(eq(proposals.id, proposalId), eq(proposals.userId, session.user.id)))
    .limit(1)

  if (!proposal) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const [user] = await db
    .select({
      name: users.name,
      companyName: users.companyName,
      logoUrl: users.logoUrl,
      accentColor: users.accentColor,
      plan: users.plan,
    })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  let buffer: Buffer
  try {
    buffer = await generatePdf({ proposal, user })
  } catch (err) {
    console.error('[PDF] generatePdf failed:', err)
    return NextResponse.json({ error: 'Falha ao gerar PDF. Tente novamente.' }, { status: 500 })
  }

  const filename = `proposta-${proposal.clientName.toLowerCase().replace(/\s+/g, '-')}.pdf`

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(buffer.length),
    },
  })
}
