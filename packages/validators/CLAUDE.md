# @propfreela/validators

## O que é
Schemas Zod para validação de inputs. É a camada de contrato entre o client e o server.

## Responsabilidades
- Definir e exportar todos os schemas Zod de input (Create, Update, List)
- Exportar os tipos inferidos (`z.infer<typeof Schema>`)
- Ser a única fonte de verdade para regras de validação de formulários e tRPC

## NÃO faz
- Lógica de negócio (ex: verificar se usuário tem limite de propostas)
- Acessa banco de dados
- Importa de packages que não sejam `zod`

## Schemas exportados
```ts
// Proposals
CreateProposalSchema, CreateProposalInput
UpdateProposalSchema, UpdateProposalInput
ListProposalsSchema, ListProposalsInput
ProposalTemplateEnum  // z.enum(['clean', 'moderno'])
ProposalStatusEnum    // z.enum(['rascunho', 'enviada', 'aprovada', 'recusada'])

// Users
UpdateUserSchema, UpdateUserInput
CreateCheckoutSessionSchema, CreateCheckoutSessionInput
```

## Uso no formulário (React Hook Form)
```ts
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateProposalSchema, type CreateProposalInput } from '@propfreela/validators'

const form = useForm<CreateProposalInput>({
  resolver: zodResolver(CreateProposalSchema),
})
```

## Uso no tRPC router
```ts
import { CreateProposalSchema } from '@propfreela/validators'

proposals.create: publicProcedure
  .input(CreateProposalSchema)
  .mutation(...)
```

## Convenções
- Mensagens de erro em português
- Nunca usar `z.any()` ou `z.unknown()` sem justificativa
- Campos opcionais: prefer `.optional()` a `.nullable()` quando possível
