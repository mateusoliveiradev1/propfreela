import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

export function createDb(connectionString: string) {
  const sql = neon(connectionString)
  return drizzle(sql, { schema })
}

export type Database = ReturnType<typeof createDb>

// Re-export everything from schema so consumers only need one import
export * from './schema'
