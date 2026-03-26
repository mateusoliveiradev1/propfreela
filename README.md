<div align="center">

<img src="apps/web/public/logo.svg" alt="PropFreela" width="180" />

# PropFreela

**Gere propostas comerciais profissionais em PDF — em segundos.**

Micro-SaaS para freelancers brasileiros fecharem mais contratos com propostas elegantes, geradas com IA e entregues em PDF de alta qualidade.

[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat-square&logo=drizzle&logoColor=black)](https://orm.drizzle.team)
[![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=flat-square&logo=trpc&logoColor=white)](https://trpc.io)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=flat-square&logo=turborepo&logoColor=white)](https://turbo.build)

</div>

---

## O que é

O **PropFreela** resolve um problema real de quem trabalha como freelancer no Brasil: criar propostas comerciais bonitas e profissionais consome tempo e exige habilidade que a maioria não tem.

Com o PropFreela você:

- Preenche título, cliente, valor e prazo
- Clica em **"Gerar com IA"** — o texto do escopo é criado automaticamente
- Escolhe um dos templates de PDF
- Baixa e envia pro cliente em menos de 2 minutos

---

## Funcionalidades

| Recurso | Grátis | Pro |
|---|---|---|
| Propostas por mês | 3 | Ilimitadas |
| Templates de PDF | 5 | 5 |
| Geração de escopo com IA | Sim | Sim |
| Watermark no PDF | Sim | Não |
| Logo própria no PDF | Não | Sim |
| Cor de destaque | Não | Sim |
| Histórico de propostas | Sim | Sim |
| Duplicar proposta | Sim | Sim |
| Suporte por email | Não | Sim |

**Plano Pro:** R$ 29/mês ou R$ 197/ano (economize 44%)

---

## Stack

### Monorepo
- **[Turborepo](https://turbo.build)** — build com cache incremental
- **[pnpm](https://pnpm.io)** — gerenciador de pacotes eficiente

### Web (`apps/web`)
- **[Next.js 14](https://nextjs.org)** — App Router + Server Components
- **[tRPC v11](https://trpc.io)** — API type-safe end-to-end
- **[NextAuth v5](https://authjs.dev)** — autenticação via Google OAuth
- **[Tailwind CSS v4](https://tailwindcss.com)** — estilização utility-first
- **[Zod](https://zod.dev)** — validação de schemas

### Banco de Dados
- **[Drizzle ORM](https://orm.drizzle.team)** — ORM type-safe com migrations
- **[Neon](https://neon.tech)** — PostgreSQL serverless

### PDF
- **[@react-pdf/renderer](https://react-pdf.org)** — geração de PDF com React
- Inter font — embed base64 para compatibilidade universal

### IA (ambas gratuitas)
- **[Groq](https://groq.com)** — Llama 3.3 70B, ~14.400 req/dia grátis *(primária)*
- **[Google Gemini](https://ai.google.dev)** — Gemini 2.0 Flash, 1.500 req/dia grátis *(fallback)*

### Pagamentos
- **[Stripe](https://stripe.com)** — Checkout + Webhooks

### Storage
- **[Cloudinary](https://cloudinary.com)** — upload de logo do usuário

---

## Estrutura do projeto

```
propfreela/
├── apps/
│   └── web/                        # Next.js 14 — interface principal
│       ├── app/                    # App Router (pages, layouts, API routes)
│       │   ├── (dashboard)/        # Área autenticada
│       │   │   ├── dashboard/      # Listagem de propostas
│       │   │   ├── nova-proposta/  # Criar proposta + IA
│       │   │   ├── propostas/[id]/ # Detalhe + download PDF
│       │   │   ├── configuracoes/  # Perfil + logo + cor
│       │   │   └── admin/          # Painel administrativo
│       │   └── api/
│       │       ├── auth/           # NextAuth handlers
│       │       ├── pdf/[id]/       # Geração de PDF server-side
│       │       ├── upload/         # Upload de logo (Cloudinary)
│       │       └── stripe/         # Webhook de pagamento
│       ├── components/             # Componentes React
│       ├── server/
│       │   ├── trpc/               # Routers tRPC
│       │   └── services/           # Lógica de negócio (AI, proposals, etc.)
│       └── auth.ts                 # Configuração NextAuth
│
└── packages/
    ├── db/         # @propfreela/db         — schema Drizzle + types
    ├── validators/ # @propfreela/validators  — schemas Zod
    ├── pdf/        # @propfreela/pdf         — templates PDF
    └── ui/         # @propfreela/ui          — design system
```

---

## Começando

### Pré-requisitos

- Node.js 20+
- pnpm 10+
- Conta no [Neon](https://neon.tech) (PostgreSQL grátis)
- Conta no [Google Cloud](https://console.cloud.google.com) (OAuth)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/mateusoliveiradev1/propfreela.git
cd propfreela

# Instale as dependências
pnpm install
```

### Variáveis de ambiente

Crie o arquivo `apps/web/.env.local`:

```env
# Banco de dados (Neon PostgreSQL)
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_SECRET=sua-string-secreta-aqui
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# IA — pelo menos uma das chaves abaixo
# Groq (grátis): https://console.groq.com
GROQ_API_KEY=

# Gemini (grátis): https://aistudio.google.com/app/apikey
GEMINI_API_KEY=

# Stripe (pagamentos)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_MONTHLY=
STRIPE_PRICE_ID_YEARLY=

# Cloudinary (upload de logo)
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Banco de dados

```bash
# Gera as migrations
pnpm --filter @propfreela/db db:generate

# Aplica as migrations
pnpm --filter @propfreela/db db:migrate
```

### Desenvolvimento

```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## Templates de PDF

O projeto inclui 5 templates profissionais:

| Template | Estilo |
|---|---|
| **Clean** | Minimalista com barra de cor, hierarquia clara |
| **Moderno** | Sidebar escura + área principal em branco |
| **Bold** | Tipografia impactante, header em destaque |
| **Minimal** | Ultra clean, muito espaço em branco |
| **Executivo** | Formal, ideal para contratos corporativos |

Todos os templates suportam:
- Logo própria do freelancer (plano Pro)
- Cor de destaque personalizada
- Watermark automático no plano gratuito

---

## Comandos

```bash
pnpm dev              # Inicia em modo desenvolvimento
pnpm build            # Build de produção (com cache Turbo)
pnpm type-check       # TypeScript em todos os packages
pnpm test             # Vitest (unit/integration)
pnpm test:e2e         # Playwright (E2E)
pnpm lint             # ESLint em todo o monorepo
```

---

## Deploy

O projeto está pronto para deploy na [Vercel](https://vercel.com):

1. Conecte o repositório na Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push na `main`

> Configure também o webhook do Stripe apontando para `https://seudominio.com/api/stripe/webhook`

---

## Licença

MIT — veja [LICENSE](LICENSE) para detalhes.

---

<div align="center">

Feito com foco no freelancer brasileiro.

</div>
