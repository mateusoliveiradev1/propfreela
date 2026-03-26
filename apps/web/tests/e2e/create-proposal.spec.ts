import { test, expect } from '@playwright/test'

// These tests require an authenticated session.
// In CI, use a seeded test user and session cookie fixture.
// See: https://playwright.dev/docs/auth

test.describe('Create proposal (authenticated)', () => {
  // Skip if no session cookie is available (non-CI local dev with real auth)
  test.skip(
    !process.env['TEST_SESSION_COOKIE'],
    'Requires TEST_SESSION_COOKIE env var for authenticated tests',
  )

  test.beforeEach(async ({ context }) => {
    // Inject the pre-authenticated session cookie
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

  test('can navigate to nova-proposta', async ({ page }) => {
    await page.goto('/propostas')
    await page.getByRole('link', { name: '+ Nova proposta' }).click()
    await expect(page).toHaveURL('/nova-proposta')
    await expect(page.getByRole('heading', { name: 'Criar proposta' })).toBeVisible()
  })

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.goto('/nova-proposta')
    await page.getByRole('button', { name: 'Gerar proposta' }).click()
    // Zod validation errors should appear
    await expect(page.getByText(/obrigatório|mínimo/i).first()).toBeVisible()
  })

  test('creates a proposal and redirects to detail page', async ({ page }) => {
    await page.goto('/nova-proposta')

    await page.getByLabel(/nome do cliente/i).fill('Empresa Teste')
    await page.getByLabel(/título interno/i).fill('Projeto de Teste E2E')
    await page.getByLabel(/escopo/i).fill('Escopo detalhado do projeto para fins de teste automatizado')
    await page.getByLabel(/valor/i).fill('3000')
    await page.getByRole('button', { name: 'Gerar proposta' }).click()

    // Should redirect to proposal detail
    await expect(page).toHaveURL(/\/propostas\/[a-z0-9]+/)
    await expect(page.getByRole('heading', { name: 'Projeto de Teste E2E' })).toBeVisible()
  })
})

test.describe('Landing page (public)', () => {
  test('renders hero text', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(/Propostas comerciais profissionais/i)).toBeVisible()
  })

  test('has link to precos', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /preços/i })).toBeVisible()
  })

  test('precos page renders', async ({ page }) => {
    await page.goto('/precos')
    await expect(page.getByRole('heading', { name: /simples e transparente/i })).toBeVisible()
  })
})
