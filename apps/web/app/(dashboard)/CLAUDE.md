# app/(dashboard)/

## O que é
Área autenticada do app. Todas as rotas aqui exigem sessão válida.

## Proteção
- `layout.tsx` verifica sessão via `auth()` e redireciona para `/login` se ausente
- Middleware também protege via `middleware.ts` (segunda camada)
- `TRPCProvider` está no layout — disponível para todos os Client Components filhos

## Rotas
- `/dashboard` — home: métricas + propostas recentes
- `/nova-proposta` — formulário de criação
- `/propostas` — lista completa com filtros
- `/propostas/[id]` — detalhe da proposta
- `/propostas/[id]/editar` — formulário de edição
- `/configuracoes` — logo, empresa, cor, plano

## Convenções
- Server Components podem usar `createServerCaller()` para tRPC
- Client Components usam `trpc.xxx.useQuery/useMutation()`
- Sempre mostrar `UpgradeModal` quando tRPC retornar `FORBIDDEN`
