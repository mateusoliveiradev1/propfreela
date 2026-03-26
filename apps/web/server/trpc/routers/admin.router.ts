import { z } from 'zod'
import { count, eq } from 'drizzle-orm'
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

    return {
      totalUsers: allUsers.length,
      proUsers: allUsers.filter((u) => u.plan === 'pro').length,
      freeUsers: allUsers.filter((u) => u.plan === 'free').length,
      totalProposals: allProposals.length,
    }
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
