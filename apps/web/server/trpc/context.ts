import { auth } from '@/auth'
import { db } from '@/server/db'

export async function createContext() {
  const session = await auth()
  return { session, db }
}

export type Context = Awaited<ReturnType<typeof createContext>>
