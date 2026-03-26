import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

// ─── Users ───────────────────────────────────────────────────────────────────

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified', { withTimezone: true }),
  name: text('name').notNull(),
  image: text('image'),
  plan: text('plan', { enum: ['free', 'pro'] }).default('free').notNull(),
  role: text('role', { enum: ['user', 'admin'] }).default('user').notNull(),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  companyName: text('company_name'),
  logoUrl: text('logo_url'),
  accentColor: text('accent_color').default('#1A472A').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// ─── Proposals ───────────────────────────────────────────────────────────────

export const proposals = pgTable('proposals', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  clientName: text('client_name').notNull(),
  clientEmail: text('client_email'),
  scope: text('scope').notNull(),
  valueInCents: integer('value_in_cents').notNull(),
  deadline: text('deadline'),
  paymentTerms: text('payment_terms'),
  templateId: text('template_id', { enum: ['clean', 'moderno', 'bold', 'minimal', 'executivo'] }).default('clean').notNull(),
  status: text('status', {
    enum: ['rascunho', 'enviada', 'aprovada', 'recusada'],
  })
    .default('rascunho')
    .notNull(),
  publicToken: text('public_token').unique(),
  pdfUrl: text('pdf_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// ─── NextAuth Required Tables ─────────────────────────────────────────────────

export const accounts = pgTable('accounts', {
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  // Auth.js DrizzleAdapter requires these field names in snake_case
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
})

export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { withTimezone: true }).notNull(),
})

export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires', { withTimezone: true }).notNull(),
})

// ─── Inferred Types (single source of truth) ─────────────────────────────────

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Proposal = typeof proposals.$inferSelect
export type NewProposal = typeof proposals.$inferInsert
export type ProposalStatus = Proposal['status']
export type ProposalTemplate = Proposal['templateId']
export type UserPlan = User['plan']
export type UserRole = User['role']
