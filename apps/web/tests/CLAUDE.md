# tests/

## Estratégia de testes

### Hierarquia
```
Unit (Vitest)        — lógica pura: services, utils, schemas
Integration (Vitest) — tRPC procedures, DB queries com Neon test branch
Component (RTL)      — renderização e interação
E2E (Playwright)     — fluxos críticos end-to-end
```

### Regra TDD: Red → Green → Refactor
1. Escreve test que falha
2. Implementa mínimo para passar
3. Refatora mantendo green

### Unit tests
- Arquivo: ao lado do código (ex: `server/services/proposals.service.test.ts`)
- Mock do DB: usar `vi.mock` com implementação fake
- Cobertura mínima: 80% de linhas e funções

### E2E tests (tests/e2e/)
- `auth.spec.ts` — login, logout, proteção de rotas
- `create-proposal.spec.ts` — fluxo completo de criar e baixar proposta
- `payment.spec.ts` — limite free, modal de upgrade, Stripe mock

### Env de teste
- Banco: usar Neon test branch (DATABASE_URL_TEST)
- Stripe: modo teste (keys sk_test_*)
- Auth: mock via MSW ou fixtures do Playwright

### Fixtures do Playwright
```ts
// Usar page.route() para mockar OAuth e não depender do Google real
await page.route('**/api/auth/**', route => { ... })
```
