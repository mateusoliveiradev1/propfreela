# components/proposals/

## O que é
Componentes React específicos de propostas comerciais.

## Responsabilidades
- ProposalStatusBadge — badge de status com cor semântica
- ProposalForm — formulário de criação/edição (Sprint 4)
- ProposalCard — card de proposta na listagem (Sprint 4)
- ProposalList — lista de propostas com filtros (Sprint 4)

## Dependências
- Importa de: @propfreela/ui, @propfreela/db (tipos), @propfreela/validators
- Importado por: app/(dashboard)/*

## Convenções
- Componentes com 'use client' apenas quando necessário
- Props tipadas com tipos de @propfreela/db
- Nunca fazem fetch direto — recebem dados via props ou tRPC hooks
