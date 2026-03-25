# PropFreela — Monorepo

## O que é
Micro-SaaS para freelancers brasileiros gerarem propostas comerciais profissionais em PDF.
Renda passiva via SEO orgânico em PT-BR. Sem o dono aparecer.

## Estrutura do monorepo
```
propfreela/
├── packages/
│   ├── db/          @propfreela/db         — schema Drizzle + tipos (source of truth)
│   ├── validators/  @propfreela/validators  — schemas Zod de input
│   ├── pdf/         @propfreela/pdf         — geração de PDF com @react-pdf/renderer
│   └── ui/          @propfreela/ui          — design system (Button, Input, Field, Badge)
└── apps/
    └── web/                                 — Next.js 14 App Router
```

## Regra fundamental de dependências
```
packages/db         ← não importa nada do monorepo
packages/validators ← importa apenas @propfreela/db (para tipos)
packages/pdf        ← importa apenas @propfreela/db
packages/ui         ← não importa nada do monorepo
apps/web            ← importa de qualquer packages/*
```

## Stack
- **Runtime:** Node.js 20+, pnpm 10+
- **Monorepo:** Turborepo 2
- **Web:** Next.js 14 (App Router), TypeScript strict
- **API:** tRPC v11 + Zod (tipagem end-to-end)
- **Banco:** Drizzle ORM + Neon PostgreSQL
- **Auth:** NextAuth v5 (Google OAuth)
- **PDF:** @react-pdf/renderer
- **Pagamentos:** Stripe Checkout
- **Estilo:** Tailwind CSS (tokens customizados, não defaults shadcn)
- **Tests:** Vitest (unit/integration) + Playwright (E2E)

## Comandos principais
```bash
pnpm dev              # inicia todos os apps em modo dev
pnpm build            # build de tudo (com cache Turbo)
pnpm type-check       # TypeScript em todos os packages
pnpm test             # Vitest em todos os packages
pnpm test:e2e         # Playwright em apps/web

# DB (rodar no packages/db)
pnpm --filter @propfreela/db db:generate
pnpm --filter @propfreela/db db:migrate
```

## Design System
- Estilo editorial/minimalista. Referências: Linear, Vercel
- Inputs: underline apenas (border-b), sem caixa
- Botões: rounded-sm, sem gradiente, sem sombra
- Fundo: #F7F6F3 (warm white), texto: #0D0D0B, accent: #1A472A
- Font: Geist (next/font/local)

## Modelo de negócio
- **Grátis:** 3 propostas/mês + watermark no PDF
- **Pro:** R$29/mês ou R$197/ano — ilimitado, sem watermark, logo própria

## Env vars necessárias (apps/web/.env.local)
```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_MONTHLY=
STRIPE_PRICE_ID_YEARLY=
NEXT_PUBLIC_APP_URL=
```
