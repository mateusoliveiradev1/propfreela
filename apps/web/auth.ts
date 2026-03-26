import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/server/db'
import { accounts, sessions, users, verificationTokens } from '@propfreela/db'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google({
      clientId: process.env['GOOGLE_CLIENT_ID'] ?? '',
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'] ?? '',
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      session.user.role = (user as unknown as { role: 'user' | 'admin' }).role ?? 'user'
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
})

// Extend NextAuth session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'user' | 'admin'
      email: string
      name: string
      image?: string | null
    }
  }
}
