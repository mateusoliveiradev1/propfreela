# server/trpc/

## O que é
Configuração do tRPC: context, base procedures e routers.

## Arquivos
- `trpc.ts` — `initTRPC`, `publicProcedure`, `protectedProcedure`
- `context.ts` — `createContext()` com session (NextAuth) + db (Drizzle)
- `router.ts` — root `appRouter` que agrega todos os sub-routers
- `routers/proposals.router.ts` — CRUD de propostas
- `routers/user.router.ts` — perfil + Stripe checkout

## Regras
- `protectedProcedure` para TUDO que exige login
- `publicProcedure` apenas para operações genuinamente públicas
- Routers não contêm lógica de negócio — delegam para `server/services/`
- Sempre usar schemas de `@propfreela/validators` como `.input()`

## Exemplo de procedure
```ts
import { protectedProcedure } from '../trpc'
import { CreateProposalSchema } from '@propfreela/validators'
import { proposalsService } from '../services/proposals.service'

export const proposalsRouter = router({
  create: protectedProcedure
    .input(CreateProposalSchema)
    .mutation(({ ctx, input }) =>
      proposalsService.create({ userId: ctx.session.user.id, input, db: ctx.db })
    ),
})
```

## Tipos do AppRouter
```ts
import type { AppRouter } from '@/server/trpc/router'
// Usado no cliente tRPC para inferir todos os tipos automaticamente
```
