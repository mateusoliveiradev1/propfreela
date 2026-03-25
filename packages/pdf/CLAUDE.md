# @propfreela/pdf

## O que é
Package de geração de PDFs de proposta comercial. Usa `@react-pdf/renderer` para renderizar
componentes React como documentos PDF no servidor.

## Responsabilidades
- `generatePdf(options)` — renderiza proposta como PDF e retorna `Buffer`
- Adicionar watermark "PropFreela Grátis" para usuários do plano free
- Dois templates: `TemplateClean` e `TemplateModerno`

## NÃO faz
- Acessa banco de dados (recebe os dados prontos por parâmetro)
- Salva PDF em lugar nenhum (só retorna Buffer)
- Lógica de autenticação ou autorização

## IMPORTANTE: Limitações do @react-pdf/renderer
- **Sem CSS Grid** — use apenas Flexbox
- **Sem `position: fixed`** — use `position: absolute` para elementos de página
- **Sem web fonts via `next/font`** — registre fontes com `Font.register()` + URL externa
- Watermark é renderizado como `<Text>` com `position: absolute` dentro do template
- Não existe "pós-processamento" do buffer — a lógica de watermark vive dentro do componente React

## Uso
```ts
import { generatePdf } from '@propfreela/pdf'

const buffer = await generatePdf({ proposal, user })
// buffer é um Buffer pronto para servir como application/pdf
```

## Templates
- `TemplateClean`: layout de página única, editorial, minimalista
- `TemplateModerno`: sidebar escura + conteúdo principal

## Tests
- Arquivo: `src/pdf.service.test.ts`
- O que testar: buffer não vazio, watermark para free, sem watermark para pro

## Convenções
- Cores nunca hardcodadas — usar `user.accentColor` como parâmetro
- Formatação de moeda: `pt-BR` (BRL)
- Formatação de data: `pt-BR` (dd/mm/yyyy)
