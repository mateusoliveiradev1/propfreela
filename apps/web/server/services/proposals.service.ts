import { TRPCError } from '@trpc/server'
import { and, eq, gte, isNotNull, lt, lte, sql } from 'drizzle-orm'
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
      expiresAt: input.expiresAt ?? null,
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

  const token = proposal.publicToken ?? createId()

  // Always update when coming from rascunho or em_revisao
  const needsUpdate =
    !proposal.publicToken ||
    proposal.status === 'rascunho' ||
    proposal.status === 'em_revisao'

  if (needsUpdate) {
    await db
      .update(proposals)
      .set({
        publicToken: token,
        // rascunho → enviada on first share
        ...(proposal.status === 'rascunho' ? { status: 'enviada' as const } : {}),
        // em_revisao → enviada when freelancer resends; clear feedback
        ...(proposal.status === 'em_revisao'
          ? { status: 'enviada' as const, clientFeedback: null }
          : {}),
        updatedAt: new Date(),
      })
      .where(eq(proposals.id, id))
  }

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
      expiresAt: proposals.expiresAt,
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
  feedback,
  db,
}: {
  token: string
  action: 'aprovada' | 'recusada' | 'revisao'
  feedback?: string
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

  if (action === 'revisao') {
    if (!feedback?.trim()) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Descreva o que precisa ser revisado.' })
    }
    await db
      .update(proposals)
      .set({ status: 'em_revisao', clientFeedback: feedback.trim(), updatedAt: new Date() })
      .where(eq(proposals.publicToken, token))
    return { status: 'em_revisao' as const }
  }

  await db
    .update(proposals)
    .set({ status: action, updatedAt: new Date() })
    .where(eq(proposals.publicToken, token))

  return { status: action }
}

// ─── Cron helpers ────────────────────────────────────────────────────────────

async function expireOverdue({ db }: { db: Database }): Promise<number> {
  const now = new Date()
  const result = await db
    .update(proposals)
    .set({ status: 'expirada', updatedAt: now })
    .where(
      and(
        eq(proposals.status, 'enviada'),
        isNotNull(proposals.expiresAt),
        lt(proposals.expiresAt, now),
      ),
    )
    .returning({ id: proposals.id })
  return result.length
}

async function findExpiringIn2Days({ db }: { db: Database }) {
  const in2Days = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  const in3Days = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

  return db
    .select({
      id: proposals.id,
      title: proposals.title,
      clientName: proposals.clientName,
      clientEmail: proposals.clientEmail,
      publicToken: proposals.publicToken,
      expiresAt: proposals.expiresAt,
      userEmail: users.email,
      userName: users.name,
    })
    .from(proposals)
    .innerJoin(users, eq(proposals.userId, users.id))
    .where(
      and(
        eq(proposals.status, 'enviada'),
        isNotNull(proposals.expiresAt),
        gte(proposals.expiresAt, in2Days),
        lte(proposals.expiresAt, in3Days),
      ),
    )
}

// ─── View tracking ────────────────────────────────────────────────────────────

async function recordView({ publicToken, db }: { publicToken: string; db: Database }) {
  await db
    .update(proposals)
    .set({
      viewCount: sql`${proposals.viewCount} + 1`,
      lastViewedAt: new Date(),
    })
    .where(eq(proposals.publicToken, publicToken))
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
  recordView,
  expireOverdue,
  findExpiringIn2Days,
}
