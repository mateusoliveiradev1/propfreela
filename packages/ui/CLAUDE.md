# @propfreela/ui

## O que é
Design system da PropFreela. Componentes React primitivos com estilo editorial/minimalista.
Usados em `apps/web` e qualquer futura app do monorepo.

## Responsabilidades
- Componentes visuais reutilizáveis: Button, Input, Textarea, Field, Badge
- Utilitário `cn()` para merge de classes Tailwind

## NÃO faz
- Lógica de negócio
- Chamadas a APIs ou banco de dados
- Gerenciamento de estado (sem zustand, useState além do necessário para UI primitiva)

## Filosofia de design
- **Inputs:** estilo underline (apenas `border-b`), sem caixa
- **Botões:** `rounded-sm`, sem gradiente, sem sombra excessiva
- **Cores:** sempre via tokens Tailwind definidos em `apps/web/tailwind.config.ts`
- **Zero sombra em cards** — usar borders sutis

## Componentes
```tsx
<Button variant="primary|ghost|destructive" size="sm|md|lg" loading={bool}>
<Input error={bool} />
<Textarea error={bool} />
<Field label="..." error="..." hint="..." required>
  <Input ... />
</Field>
<Badge variant="default|success|warning|danger|info">
<ProposalStatusBadge status={ProposalStatus} />
```

## Tokens de cor (definidos em apps/web/tailwind.config.ts)
```
bg-bg-base       #F7F6F3  — fundo principal
bg-bg-subtle     #EFEDE8  — campos, containers
bg-bg-overlay    #E8E5DD  — hover states
text-fg-base     #0D0D0B  — texto principal
text-fg-muted    #6B6860  — textos secundários
text-fg-placeholder #A8A49C
border-border    #D8D4CC
bg-accent / hover:bg-accent-hover  #1A472A / #163D24
text-accent-fg   #FFFFFF
```

## Convenção de uso
```ts
import { Button, Field, Input } from '@propfreela/ui'
```
