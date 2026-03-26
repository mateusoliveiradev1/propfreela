import { TRPCError } from '@trpc/server'
import { and, eq, gte, lt } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { proposals, users } from '@propfreela/db'
import type { Database, Proposal, ProposalStatus } from '@propfreela/db'
import type { CreateProposalInput, UpdateProposalInput } from '@propfreela/validators'

const FREE_MONTHLY_LIMIT = 3

type ServiceContext = {
  userId: string
  db: Database
}

// ─── Queries ─────────────────────────────────────────────────────────────────

async function list({
  userId,
  db,
  status,
}: ServiceContext & { status?: ProposalStatus }): Promise<Proposal[]> {
  const conditions = status
    ? and(eq(proposals.userId, userId), eq(proposals.status, status))
    : eq(proposals.userId, userId)

  return db.select().from(proposals).where(conditions)
}

async function getById({
  id,
  userId,
  db,
}: ServiceContext & { id: string }): Promise<Proposal | null> {
  const [proposal] = await db
    .select()
    .from(proposals)
    .where(and(eq(proposals.id, id), eq(proposals.userId, userId)))
    .limit(1)

  return proposal ?? null
}

async function getMonthlyCount({ userId, db }: ServiceContext): Promise<number> {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

  const rows = await db
    .select({ id: proposals.id })
    .from(proposals)
    .where(
      and(
        eq(proposals.userId, userId),
        gte(proposals.createdAt, startOfMonth),
        lt(proposals.createdAt, startOfNextMonth),
      ),
    )

  return rows.length
}

// ─── Mutations ────────────────────────────────────────────────────────────────

async function create({
  userId,
  input,
  db,
}: ServiceContext & { input: CreateProposalInput }): Promise<Proposal> {
  // Check user plan
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)

  if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' })

  if (user.plan === 'free') {
    const count = await getMonthlyCount({ userId, db })
    if (count >= FREE_MONTHLY_LIMIT) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'PROPOSAL_LIMIT_REACHED',
      })
    }
  }

  const [created] = await db
    .insert(proposals)
    .values({
      id: createId(),
      userId,
      title: input.title,
      clientName: input.clientName,
      clientEmail: input.clientEmail ?? null,
      scope: input.scope,
      valueInCents: input.valueInCents,
      deadline: input.deadline ?? null,
      paymentTerms: input.paymentTerms ?? null,
      templateId: input.templateId,
      status: 'rascunho',
    })
    .returning()

  if (!created) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
  return created
}

async function update({
  userId,
  input,
  db,
}: ServiceContext & { input: UpdateProposalInput }): Promise<Proposal> {
  const { id, ...fields } = input

  const existing = await getById({ id, userId, db })
  if (!existing) throw new TRPCError({ code: 'NOT_FOUND' })

  const [updated] = await db
    .update(proposals)
    .set({ ...fields, updatedAt: new Date() })
    .where(and(eq(proposals.id, id), eq(proposals.userId, userId)))
    .returning()

  if (!updated) throw new TRPCError({ code: 'NOT_FOUND' })
  return updated
}

async function remove({ id, userId, db }: ServiceContext & { id: string }): Promise<void> {
  const existing = await getById({ id, userId, db })
  if (!existing) throw new TRPCError({ code: 'NOT_FOUND' })

  await db
    .delete(proposals)
    .where(and(eq(proposals.id, id), eq(proposals.userId, userId)))
}

async function duplicate({
  id,
  userId,
  db,
}: ServiceContext & { id: string }): Promise<Proposal> {
  const original = await getById({ id, userId, db })
  if (!original) throw new TRPCError({ code: 'NOT_FOUND' })

  // Check plan limit before duplicating
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)

  if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' })

  if (user.plan === 'free') {
    const count = await getMonthlyCount({ userId, db })
    if (count >= FREE_MONTHLY_LIMIT) {
      throw new TRPCError({ code: 'FORBIDDEN', message: 'PROPOSAL_LIMIT_REACHED' })
    }
  }

  const [duplicated] = await db
    .insert(proposals)
    .values({
      id: createId(),
      userId,
      title: `${original.title} (cópia)`,
      clientName: original.clientName,
      clientEmail: original.clientEmail,
      scope: original.scope,
      valueInCents: original.valueInCents,
      deadline: original.deadline,
      paymentTerms: original.paymentTerms,
      templateId: original.templateId,
      status: 'rascunho',
    })
    .returning()

  if (!duplicated) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
  return duplicated
}

// ─── Share & Approve ─────────────────────────────────────────────────────────

async function generateShareToken({
  id,
  userId,
  db,
}: ServiceContext & { id: string }): Promise<{ token: string; url: string }> {
  const proposal = await getById({ id, userId, db })
  if (!proposal) throw new TRPCError({ code: 'NOT_FOUND' })

  // Reuse existing token if already shared
  if (proposal.publicToken) {
    const url = `${process.env['NEXT_PUBLIC_APP_URL'] ?? ''}/p/${proposal.publicToken}`
    return { token: proposal.publicToken, url }
  }

  const token = createId()

  await db
    .update(proposals)
    .set({
      publicToken: token,
      // Auto-transition from rascunho → enviada when sharing
      ...(proposal.status === 'rascunho' ? { status: 'enviada' as const } : {}),
      updatedAt: new Date(),
    })
    .where(eq(proposals.id, id))

  const url = `${process.env['NEXT_PUBLIC_APP_URL'] ?? ''}/p/${token}`
  return { token, url }
}

async function getByPublicToken({
  token,
  db,
}: {
  token: string
  db: Database
}) {
  const [row] = await db
    .select({
      id: proposals.id,
      title: proposals.title,
      clientName: proposals.clientName,
      clientEmail: proposals.clientEmail,
      scope: proposals.scope,
      valueInCents: proposals.valueInCents,
      deadline: proposals.deadline,
      paymentTerms: proposals.paymentTerms,
      templateId: proposals.templateId,
      status: proposals.status,
      createdAt: proposals.createdAt,
      // User info for branding
      userName: users.name,
      companyName: users.companyName,
      accentColor: users.accentColor,
      logoUrl: users.logoUrl,
      userPlan: users.plan,
    })
    .from(proposals)
    .innerJoin(users, eq(proposals.userId, users.id))
    .where(eq(proposals.publicToken, token))
    .limit(1)

  if (!row) throw new TRPCError({ code: 'NOT_FOUND', message: 'Proposta não encontrada' })
  return row
}

async function respondByPublicToken({
  token,
  action,
  db,
}: {
  token: string
  action: 'aprovada' | 'recusada'
  db: Database
}) {
  const [proposal] = await db
    .select({ id: proposals.id, status: proposals.status })
    .from(proposals)
    .where(eq(proposals.publicToken, token))
    .limit(1)

  if (!proposal) throw new TRPCError({ code: 'NOT_FOUND', message: 'Proposta não encontrada' })

  if (proposal.status !== 'enviada') {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Esta proposta já foi respondida',
    })
  }

  await db
    .update(proposals)
    .set({ status: action, updatedAt: new Date() })
    .where(eq(proposals.publicToken, token))

  return { status: action }
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const proposalsService = {
  list,
  getById,
  getMonthlyCount,
  create,
  update,
  remove,
  duplicate,
  generateShareToken,
  getByPublicToken,
  respondByPublicToken,
}
