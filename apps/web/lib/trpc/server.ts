import 'server-only'
import { createCallerFactory } from '@/server/trpc/trpc'
import { appRouter } from '@/server/trpc/router'
import { createContext } from '@/server/trpc/context'

const createCaller = createCallerFactory(appRouter)

/**
 * Server-side tRPC caller for use in Server Components and Route Handlers.
 * Creates a new caller per request (fresh context each time).
 */
export async function createServerCaller() {
  const ctx = await createContext()
  return createCaller(ctx)
}
