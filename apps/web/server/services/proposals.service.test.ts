import { describe, it, expect, vi } from 'vitest'
import { TRPCError } from '@trpc/server'
import { proposalsService } from './proposals.service'
import type { Database } from '@propfreela/db'

// ─── Fixtures ────────────────────────────────────────────────────────────────

const MOCK_PROPOSAL = {
  id: 'cuid_proposal_1',
  userId: 'cuid_user_1',
  title: 'Projeto Website',
  clientName: 'Acme Corp',
  clientEmail: 'contato@acme.com',
  scope: 'Desenvolvimento de website institucional completo',
  valueInCents: 450000,
  deadline: '2026-04-30',
  paymentTerms: '50% na aprovação, 50% na entrega',
  templateId: 'clean' as const,
  status: 'rascunho' as const,
  pdfUrl: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const USER_FREE = {
  id: 'cuid_user_1',
  plan: 'free' as const,
  email: 'user@test.com',
  name: 'Test User',
  companyName: null,
  logoUrl: null,
  accentColor: '#1A472A',
  stripeCustomerId: null,
  stripeSubscriptionId: null,
  image: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const USER_PRO = { ...USER_FREE, plan: 'pro' as const }

const INPUT = {
  title: 'Projeto Website',
  clientName: 'Acme Corp',
  scope: 'Desenvolvimento de website institucional completo com pelo menos 10 chars',
  valueInCents: 450000,
  templateId: 'clean' as const,
}

// ─── DB mock helpers ─────────────────────────────────────────────────────────

function createMockDb(selectResults: unknown[][]): Database {
  let selectCallCount = 0

  const mockDb = {
    select: vi.fn(() => {
      const results = selectResults[selectCallCount++] ?? []
      return {
        from: vi.fn(() => ({
          where: vi.fn(() => {
            const resultPromise = Promise.resolve(results)
            return Object.assign(resultPromise, {
              limit: vi.fn(() => Promise.resolve(results)),
            })
          }),
        })),
      }
    }),
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        returning: vi.fn(() => Promise.resolve([MOCK_PROPOSAL])),
      })),
    })),
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(() => ({
          returning: vi.fn(() => Promise.resolve([MOCK_PROPOSAL])),
        })),
      })),
    })),
    delete: vi.fn(() => ({
      where: vi.fn(() => Promise.resolve()),
    })),
  } as unknown as Database

  return mockDb
}

// ─── proposalsService.create ──────────────────────────────────────────────────

describe('proposalsService.create', () => {
  it('creates a proposal with status rascunho for free user under limit', async () => {
    // select call 1: get user (free) | select call 2: getMonthlyCount → 1 row
    const db = createMockDb([[USER_FREE], [MOCK_PROPOSAL]])

    const result = await proposalsService.create({ userId: 'cuid_user_1', input: INPUT, db })

    expect(result.status).toBe('rascunho')
    expect(result.userId).toBe('cuid_user_1')
  })

  it('throws FORBIDDEN when free user has 3 proposals this month', async () => {
    // select call 1: get user (free) | select call 2: getMonthlyCount → 3 rows
    const threeProposals = [
      { id: 'p1' },
      { id: 'p2' },
      { id: 'p3' },
    ]
    const db = createMockDb([[USER_FREE], threeProposals])

    await expect(
      proposalsService.create({ userId: 'cuid_user_1', input: INPUT, db }),
    ).rejects.toThrow(TRPCError)
  })

  it('allows unlimited proposals for pro users regardless of count', async () => {
    // select call 1: get user (pro) — no need to check monthly count
    const db = createMockDb([[USER_PRO]])

    const result = await proposalsService.create({ userId: 'cuid_user_1', input: INPUT, db })
    expect(result).toBeDefined()
  })
})

// ─── proposalsService.getById ─────────────────────────────────────────────────

describe('proposalsService.getById', () => {
  it('returns proposal when it belongs to the user', async () => {
    const db = createMockDb([[MOCK_PROPOSAL]])

    const result = await proposalsService.getById({
      id: 'cuid_proposal_1',
      userId: 'cuid_user_1',
      db,
    })

    expect(result).toEqual(MOCK_PROPOSAL)
  })

  it('returns null when proposal does not exist', async () => {
    const db = createMockDb([[]])

    const result = await proposalsService.getById({
      id: 'nonexistent',
      userId: 'cuid_user_1',
      db,
    })

    expect(result).toBeNull()
  })
})

// ─── proposalsService.getMonthlyCount ────────────────────────────────────────

describe('proposalsService.getMonthlyCount', () => {
  it('returns 0 when no proposals this month', async () => {
    const db = createMockDb([[]])

    const count = await proposalsService.getMonthlyCount({
      userId: 'cuid_user_1',
      db,
    })

    expect(count).toBe(0)
  })

  it('returns correct count', async () => {
    const db = createMockDb([[{ id: 'p1' }, { id: 'p2' }]])

    const count = await proposalsService.getMonthlyCount({
      userId: 'cuid_user_1',
      db,
    })

    expect(count).toBe(2)
  })
})
