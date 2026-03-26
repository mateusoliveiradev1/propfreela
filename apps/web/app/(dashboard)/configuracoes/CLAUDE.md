# app/(dashboard)/configuracoes/

## O que é
Página de configurações do usuário: dados da empresa, cor de destaque e upload de logo.

## Responsabilidades
- Exibir plano atual (free/pro) com CTA de upgrade para free
- Formulário para companyName, accentColor e logoUrl
- Mostrar banner de sucesso pós-upgrade (?success=true)

## Componentes usados
- `ConfiguracoesForm` (Client Component) — formulário com React Hook Form
- Upload de logo via `POST /api/upload/logo` → Cloudinary

## Fluxo de upgrade
1. Usuário clica "Fazer upgrade" → vai para /precos
2. Clica em assinar → `trpc.user.createCheckoutSession` → redireciona para Stripe
3. Stripe redireciona para `/configuracoes?success=true`
4. Webhook atualiza `users.plan = 'pro'` no banco
