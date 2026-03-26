import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'
import { proposalsService } from '../../services/proposals.service'
import { aiService } from '../../services/ai.service'
import {
  CreateProposalSchema,
  UpdateProposalSchema,
  ListProposalsSchema,
  GenerateScopeSchema,
  ShareProposalSchema,
} from '@propfreela/validators'

export const proposalsRouter = router({
  list: protectedProcedure.input(ListProposalsSchema).query(({ ctx, input }) =>
    proposalsService.list({
      userId: ctx.session.user.id,
      db: ctx.db,
      ...(input.status !== undefined ? { status: input.status } : {}),
    }),
  ),

  getById: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const proposal = await proposalsService.getById({
        id: input.id,
        userId: ctx.session.user.id,
        db: ctx.db,
      })
      if (!proposal) throw new TRPCError({ code: 'NOT_FOUND' })
      return proposal
    }),

  create: protectedProcedure.input(CreateProposalSchema).mutation(({ ctx, input }) =>
    proposalsService.create({
      userId: ctx.session.user.id,
      input,
      db: ctx.db,
    }),
  ),

  update: protectedProcedure.input(UpdateProposalSchema).mutation(({ ctx, input }) =>
    proposalsService.update({
      userId: ctx.session.user.id,
      input,
      db: ctx.db,
    }),
  ),

  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(({ ctx, input }) =>
      proposalsService.remove({
        id: input.id,
        userId: ctx.session.user.id,
        db: ctx.db,
      }),
    ),

  duplicate: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(({ ctx, input }) =>
      proposalsService.duplicate({
        id: input.id,
        userId: ctx.session.user.id,
        db: ctx.db,
      }),
    ),

  share: protectedProcedure
    .input(ShareProposalSchema)
    .mutation(({ ctx, input }) =>
      proposalsService.generateShareToken({
        id: input.id,
        userId: ctx.session.user.id,
        db: ctx.db,
      }),
    ),

  generateScope: protectedProcedure.input(GenerateScopeSchema).mutation(async ({ input }) => {
    // If there's existing scope text, refine it; otherwise generate from scratch
    if (input.currentScope && input.currentScope.trim().length > 10) {
      return aiService.refineScope(input)
    }
    return aiService.generateScope(input)
  }),
})
