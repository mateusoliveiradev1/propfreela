import { test, expect } from '@playwright/test'

// Payment E2E tests require:
// - An authenticated free-plan user with exactly 3 proposals this month
// - Stripe test mode keys
// These run only in CI with the proper fixtures set up.

test.describe('Freemium limit (authenticated free user)', () => {
  test.skip(
    !process.env['TEST_SESSION_COOKIE_FREE_LIMIT'],
    'Requires TEST_SESSION_COOKIE_FREE_LIMIT (user at proposal limit)',
  )

  test.beforeEach(async ({ context }) => {
    const cookie = process.env['TEST_SESSION_COOKIE_FREE_LIMIT'] ?? ''
    await context.addCookies([
      {
        name: 'authjs.session-token',
        value: cookie,
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: false,
      },
    ])
  })

  test('shows upgrade modal when free user tries to create 4th proposal', async ({ page }) => {
    await page.goto('/nova-proposta')

    await page.getByLabel(/nome do cliente/i).fill('Cliente 4')
    await page.getByLabel(/título interno/i).fill('Proposta 4 — deve abrir modal')
    await page.getByLabel(/escopo/i).fill('Escopo longo o suficiente para validação passar aqui')
    await page.getByLabel(/valor/i).fill('1000')
    await page.getByRole('button', { name: 'Gerar proposta' }).click()

    // UpgradeModal should appear
    await expect(page.getByText(/você usou suas 3 propostas grátis/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /R\$29\/mês/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /R\$197\/ano/i })).toBeVisible()
  })

  test('upgrade modal has close button', async ({ page }) => {
    await page.goto('/nova-proposta')

    await page.getByLabel(/nome do cliente/i).fill('Cliente 4')
    await page.getByLabel(/título interno/i).fill('Proposta 4 — deve abrir modal')
    await page.getByLabel(/escopo/i).fill('Escopo longo o suficiente para validação passar aqui')
    await page.getByLabel(/valor/i).fill('1000')
    await page.getByRole('button', { name: 'Gerar proposta' }).click()

    await expect(page.getByText(/você usou suas 3 propostas grátis/i)).toBeVisible()
    await page.getByText(/continuar no plano gratuito/i).click()
    await expect(page.getByText(/você usou suas 3 propostas grátis/i)).not.toBeVisible()
  })
})

test.describe('Configuracoes page (authenticated)', () => {
  test.skip(
    !process.env['TEST_SESSION_COOKIE'],
    'Requires TEST_SESSION_COOKIE env var',
  )

  test.beforeEach(async ({ context }) => {
    const cookie = process.env['TEST_SESSION_COOKIE'] ?? ''
    await context.addCookies([
      {
        name: 'authjs.session-token',
        value: cookie,
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: false,
      },
    ])
  })

  test('shows success banner after upgrade redirect', async ({ page }) => {
    await page.goto('/configuracoes?success=true')
    await expect(page.getByText(/upgrade realizado com sucesso/i)).toBeVisible()
  })

  test('shows plan info', async ({ page }) => {
    await page.goto('/configuracoes')
    await expect(page.getByText(/plano atual/i)).toBeVisible()
    // free or pro
    await expect(page.getByText(/free|pro/i).first()).toBeVisible()
  })
})
