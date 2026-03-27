import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { router, protectedProcedure } from '../trpc'
import { users } from '@propfreela/db'
import { UpdateUserSchema, CreateCheckoutSessionSchema } from '@propfreela/validators'

export const userRouter = router({
  getMe: protectedProcedure.query(async ({ ctx }) => {
    const [user] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.id, ctx.session.user.id))
      .limit(1)

    if (!user) throw new TRPCError({ code: 'NOT_FOUND' })
    return user
  }),

  update: protectedProcedure.input(UpdateUserSchema).mutation(async ({ ctx, input }) => {
    const [updated] = await ctx.db
      .update(users)
      .set({
        ...(input.companyName !== undefined && { companyName: input.companyName }),
        ...(input.accentColor !== undefined && { accentColor: input.accentColor }),
        ...(input.logoUrl !== undefined && { logoUrl: input.logoUrl }),
        updatedAt: new Date(),
      })
      .where(eq(users.id, ctx.session.user.id))
      .returning()

    if (!updated) throw new TRPCError({ code: 'NOT_FOUND' })
    return updated
  }),

  getProposalCount: protectedProcedure.query(async ({ ctx }) => {
    // Delegated to proposals service — imported lazily to avoid circular deps
    const { proposalsService } = await import('../../services/proposals.service')
    const count = await proposalsService.getMonthlyCount({
      userId: ctx.session.user.id,
      db: ctx.db,
    })
    const FREE_LIMIT = 3
    return {
      thisMonth: count,
      remaining: Math.max(0, FREE_LIMIT - count),
    }
  }),

  createCheckoutSession: protectedProcedure
    .input(CreateCheckoutSessionSchema)
    .mutation(async ({ ctx, input }) => {
      const [user] = await ctx.db
        .select({ plan: users.plan, stripeCustomerId: users.stripeCustomerId })
        .from(users)
        .where(eq(users.id, ctx.session.user.id))
        .limit(1)

      if (!user) throw new TRPCError({ code: 'NOT_FOUND' })
      if (user.plan === 'pro') {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Usuário já é Pro' })
      }

      const priceId =
        input.interval === 'month'
          ? process.env['STRIPE_PRICE_ID_MONTHLY']
          : process.env['STRIPE_PRICE_ID_YEARLY']

      if (!priceId) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })

      const Stripe = (await import('stripe')).default
      const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'] ?? '')

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        ...(user.stripeCustomerId ? { customer: user.stripeCustomerId } : {}),
        metadata: { userId: ctx.session.user.id },
        success_url: `${process.env['NEXT_PUBLIC_APP_URL']}/sucesso`,
        cancel_url: `${process.env['NEXT_PUBLIC_APP_URL']}/precos`,
      })

      if (!session.url) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      return { url: session.url }
    }),

  cancelSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const [user] = await ctx.db
      .select({
        plan: users.plan,
        stripeSubscriptionId: users.stripeSubscriptionId,
      })
      .from(users)
      .where(eq(users.id, ctx.session.user.id))
      .limit(1)

    if (!user) throw new TRPCError({ code: 'NOT_FOUND' })
    if (user.plan !== 'pro') {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Voce ja esta no plano gratuito' })
    }

    if (user.stripeSubscriptionId) {
      const stripeKey = process.env['STRIPE_SECRET_KEY']
      if (stripeKey) {
        const Stripe = (await import('stripe')).default
        const stripe = new Stripe(stripeKey)
        await stripe.subscriptions.update(user.stripeSubscriptionId, {
          cancel_at_period_end: true,
        })
      }
    }

    // Downgrade immediately if no Stripe (e.g. admin-assigned Pro)
    if (!user.stripeSubscriptionId) {
      await ctx.db
        .update(users)
        .set({ plan: 'free', updatedAt: new Date() })
        .where(eq(users.id, ctx.session.user.id))
    }

    return { cancelled: true }
  }),

})
