import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/server/db'
import { accounts, sessions, users, verificationTokens } from '@propfreela/db'
import { sendWelcomeEmail } from '@/server/services/email.service'

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
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      session.user.role = (user as unknown as { role: 'user' | 'admin' }).role ?? 'user'
      return session
    },
    async signIn({ user }) {
      // Send welcome email on first login (emailVerified is null for new users)
      const adapterUser = user as { email?: string | null; name?: string | null; emailVerified?: Date | null }
      if (!adapterUser.emailVerified && adapterUser.email && adapterUser.name) {
        try {
          await sendWelcomeEmail(adapterUser.email, adapterUser.name)
        } catch {}
      }
      return true
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
