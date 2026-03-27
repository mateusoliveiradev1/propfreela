import { z } from 'zod'
import { count, eq, gte } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { proposals, users } from '@propfreela/db'
import { router, adminProcedure } from '../trpc'

export const adminRouter = router({
  /**
   * Overall stats: total users, pro users, total proposals.
   */
  getStats: adminProcedure.query(async ({ ctx }) => {
    const [allUsers, allProposals] = await Promise.all([
      ctx.db.select({ plan: users.plan }).from(users),
      ctx.db.select({ id: proposals.id }).from(proposals),
    ])

    const proCount = allUsers.filter((u) => u.plan === 'pro').length
    return {
      totalUsers: allUsers.length,
      proUsers: proCount,
      freeUsers: allUsers.filter((u) => u.plan === 'free').length,
      totalProposals: allProposals.length,
      mrrInCents: proCount * 2900,
    }
  }),

  /**
   * Daily signup counts for the last 30 days.
   */
  getSignupHistory: adminProcedure.query(async ({ ctx }) => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const rows = await ctx.db
      .select({ createdAt: users.createdAt })
      .from(users)
      .where(gte(users.createdAt, thirtyDaysAgo))

    // Build a 30-entry map keyed by ISO date (UTC)
    const counts: Record<string, number> = {}
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      counts[d.toISOString().split('T')[0]!] = 0
    }
    for (const row of rows) {
      const key = row.createdAt.toISOString().split('T')[0]!
      if (key in counts) counts[key]!++
    }

    return Object.entries(counts).map(([date, count]) => ({ date, count }))
  }),

  /**
   * All users with their proposal count, ordered by most recent first.
   */
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        plan: users.plan,
        role: users.role,
        createdAt: users.createdAt,
        lastLoginAt: users.lastLoginAt,
        proposalCount: count(proposals.id),
      })
      .from(users)
      .leftJoin(proposals, eq(proposals.userId, users.id))
      .groupBy(
        users.id,
        users.email,
        users.name,
        users.plan,
        users.role,
        users.createdAt,
        users.lastLoginAt,
      )
      .orderBy(users.createdAt)

    return rows
  }),

  /**
   * Change a user's plan (free ↔ pro).
   */
  setPlan: adminProcedure
    .input(z.object({ userId: z.string().min(1), plan: z.enum(['free', 'pro']) }))
    .mutation(async ({ ctx, input }) => {
      const [updated] = await ctx.db
        .update(users)
        .set({ plan: input.plan, updatedAt: new Date() })
        .where(eq(users.id, input.userId))
        .returning({ id: users.id, plan: users.plan })

      if (!updated) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Usuário não encontrado.' })
      }

      return updated
    }),
})
