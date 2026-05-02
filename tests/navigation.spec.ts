import { test, expect } from '@playwright/test';

test('bottom nav switches between the three main tabs', async ({ page }) => {
  await page.goto('/');

  // Default landing page should show Exámenes
  await expect(page.getByRole('heading', { name: 'Exámenes' })).toBeVisible();

  // Switch to Formas tab
  await page.getByRole('link', { name: 'Formas' }).click();
  await expect(page.getByRole('heading', { name: 'Formas' })).toBeVisible();
  await expect(
    page.getByPlaceholder(/Buscar por nombre|movimientos/i)
  ).toBeVisible();

  // Switch to Teoría tab
  await page.getByRole('link', { name: 'Teoría' }).click();
  await expect(page.getByRole('heading', { name: 'Teoría' })).toBeVisible();

  // Switch back to Exámenes tab
  await page.getByRole('link', { name: 'Exámenes' }).click();
  await expect(page.getByRole('heading', { name: 'Exámenes' })).toBeVisible();
});

test('header links navigate to calendar and profile', async ({ page }) => {
  await page.goto('/');

  // Navigate to calendar
  await page.getByRole('link', { name: /calendario/i }).click();
  await expect(page.getByRole('heading', { name: 'Calendario' })).toBeVisible();

  // Go back
  await page.goBack();

  // Navigate to profile
  await page.getByRole('link', { name: 'Perfil' }).click();
  await expect(page.getByRole('heading', { name: 'Perfil' })).toBeVisible();
});
