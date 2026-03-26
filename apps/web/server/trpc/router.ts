import { router } from './trpc'
import { proposalsRouter } from './routers/proposals.router'
import { userRouter } from './routers/user.router'
import { adminRouter } from './routers/admin.router'

export const appRouter = router({
  proposals: proposalsRouter,
  user: userRouter,
  admin: adminRouter,
})

export type AppRouter = typeof appRouter
