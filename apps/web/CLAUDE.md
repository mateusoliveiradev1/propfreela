# apps/web — Next.js App

## O que é
A aplicação web do PropFreela. Next.js 14 com App Router, TypeScript strict.

## Estrutura de rotas
```
app/
├── (auth)/           → /login, /cadastro — sem layout do dashboard
├── (dashboard)/      → /dashboard, /propostas, /nova-proposta, /configuracoes — autenticado
├── (public)/         → /, /precos, /blog/* — landing + SEO
└── api/
    ├── auth/         → NextAuth endpoints
    ├── trpc/         → tRPC HTTP adapter
    ├── pdf/          → GET /api/pdf/[proposalId] — gera e serve PDF
    └── webhooks/     → POST /api/webhooks/stripe
```

## Convenções de importação
- `@propfreela/db` — tipos e conexão DB
- `@propfreela/validators` — schemas Zod
- `@propfreela/ui` — componentes visuais
- `@propfreela/pdf` — geração de PDF (apenas em server code)
- `@/*` — imports relativos dentro deste app

## Server vs Client Components
- Default: Server Component
- `'use client'` apenas quando necessário (hooks, eventos, estado)
- Nunca usar hooks do React em Server Components

## tRPC
- Client: `@/lib/trpc/client.ts`
- Server caller: `@/lib/trpc/server.ts` (para Server Components)
- Procedures autenticadas verificam `ctx.session`

## Auth
- Session disponível via `auth()` do NextAuth v5
- `middleware.ts` protege `/dashboard/*` e `/api/trpc/*`
- Usuário criado no banco via DrizzleAdapter no signIn callback

## Variáveis de ambiente
Ver CLAUDE.md raiz do monorepo para lista completa.
Arquivo local: `.env.local` (não commitado)

## Tests
- Unit/Integration: `vitest` — arquivos `*.test.ts` ao lado do código
- E2E: `playwright` — em `tests/e2e/`
- Rodar: `pnpm test` e `pnpm test:e2e`

## Design System
- Não usar valores hardcodados de cor — sempre usar tokens Tailwind
- Ver `packages/ui/CLAUDE.md` para componentes disponíveis
- Ver `app/globals.css` para tokens definidos
