import { test, expect } from '@playwright/test'

test.describe('Auth', () => {
  test('login page shows Google sign-in button', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('button', { name: /google/i })).toBeVisible()
  })

  test('dashboard redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/login/)
  })

  test('propostas redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/propostas')
    await expect(page).toHaveURL(/\/login/)
  })

  test('nova-proposta redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/nova-proposta')
    await expect(page).toHaveURL(/\/login/)
  })

  test('configuracoes redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/configuracoes')
    await expect(page).toHaveURL(/\/login/)
  })
})
