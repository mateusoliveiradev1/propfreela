# app/(auth)/

## O que é
Páginas de autenticação: login e cadastro. Sem layout do dashboard.

## Rotas
- `/login` — botão "Entrar com Google" via NextAuth v5 Server Action

## Convenções
- Server Components puros (sem 'use client')
- Auth via Server Actions (`signIn()` importado de `@/auth`)
- Redirecionamento automático para `/dashboard` se já autenticado (middleware.ts)
- Visual: clean, editorial. Sem card com sombra. Layout centralizado com espaço generoso.
