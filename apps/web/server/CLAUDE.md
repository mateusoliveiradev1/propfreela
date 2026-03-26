# server/

## O que é
Código de servidor: acesso ao banco, serviços de negócio, configuração do tRPC.

## Estrutura
```
server/
├── db.ts              — singleton da conexão Drizzle com Neon
├── trpc/              — configuração tRPC (ver CLAUDE.md interno)
└── services/          — lógica de negócio pura e testável
    ├── proposals.service.ts
    └── stripe.service.ts  (Sprint 6)
```

## Regras críticas
- NUNCA importar de `components/` ou `app/` aqui
- Services recebem `db` por parâmetro (injeção de dependência — facilita testes)
- Services lançam `TRPCError` (não Error genérico)
- Toda lógica de autorização (userId check) fica nos services, não nos routers

## Pattern de service
```ts
// Sempre aceita db como parâmetro — nunca usa o singleton
async function create({ userId, input, db }: ServiceContext & { input: ... }) {
  // verifica ownership, aplica regras de negócio
  // lança TRPCError se necessário
  // retorna o tipo do banco (@propfreela/db)
}
export const myService = { create, update, ... }
```

## IDs
- Usar `createId()` de `@paralleldrive/cuid2` para gerar IDs
- Nunca usar `uuid` ou `Math.random()`
