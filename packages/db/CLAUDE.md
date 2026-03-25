# @propfreela/db

## O que é
Package de acesso ao banco de dados. Contém o schema Drizzle ORM e a factory de conexão com o Neon PostgreSQL.

## Responsabilidades
- Definir o schema completo das tabelas (users, proposals, accounts, sessions)
- Exportar tipos inferidos do schema (fonte única de verdade para tipos de domínio)
- Exportar a factory `createDb()` para criar instâncias do banco
- Rodar migrations via `drizzle-kit`

## NÃO faz
- Lógica de negócio (validação, regras de freemium, etc.)
- Acessa variáveis de ambiente diretamente — recebe a connection string por parâmetro
- Importa de qualquer outro package do monorepo

## Tipos exportados (use sempre estes, nunca redefina)
```ts
User, NewUser
Proposal, NewProposal
ProposalStatus     // 'rascunho' | 'enviada' | 'aprovada' | 'recusada'
ProposalTemplate   // 'clean' | 'moderno'
UserPlan           // 'free' | 'pro'
Database           // tipo retornado por createDb()
```

## Uso
```ts
import { createDb, type User, type Proposal } from '@propfreela/db'
const db = createDb(process.env.DATABASE_URL!)
```

## Migrations
```bash
pnpm --filter @propfreela/db db:generate   # gera migration a partir do schema
pnpm --filter @propfreela/db db:migrate    # aplica no banco
pnpm --filter @propfreela/db db:studio     # abre Drizzle Studio
```

## Convenções
- Todas as colunas de timestamp usam `withTimezone: true`
- IDs são `text` (cuid2 gerado pela aplicação, não serial)
- Foreign keys com `onDelete: 'cascade'` para manter consistência
- Nunca adicionar lógica de negócio neste package
