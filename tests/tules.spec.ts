import { test, expect } from '@playwright/test';

test('tules page shows grid of tul cards', async ({ page }) => {
  await page.goto('/tules');

  await expect(page.getByRole('heading', { name: 'Formas' })).toBeVisible();
  await expect(
    page.getByPlaceholder(/Buscar por nombre|movimientos/i)
  ).toBeVisible();

  // Should have multiple tul cards visible
  const tulCards = page.getByRole('link').filter({ hasText: /movimientos/i });
  await expect(tulCards.first()).toBeVisible();
});

test('search filters tules by name', async ({ page }) => {
  await page.goto('/tules');

  const searchInput = page
    .getByRole('searchbox')
    .or(page.locator('input[type="search"], input[placeholder*="Buscar"]'));
  await searchInput.fill('Chon-Ji');

  // Should show filtered results
  await expect(page.getByText('Chon-Ji')).toBeVisible();
});

test('clearing search shows all tules again', async ({ page }) => {
  await page.goto('/tules');

  const searchInput = page
    .getByRole('searchbox')
    .or(page.locator('input[type="search"], input[placeholder*="Buscar"]'));
  await searchInput.fill('Chon-Ji');

  // Clear the search
  await searchInput.clear();

  // Multiple tul cards should be visible again
  const tulCards = page.getByRole('link').filter({ hasText: /movimientos/i });
  expect(await tulCards.count()).toBeGreaterThan(1);
});

test('tul detail page shows diagram and meaning', async ({ page }) => {
  await page.goto('/tules');

  // Click on the first tul card
  const firstTul = page
    .getByRole('link')
    .filter({ hasText: /movimientos/i })
    .first();
  await firstTul.click();

  // Should see the detail sections
  await expect(page.getByText('Diagrama')).toBeVisible();
  await expect(page.getByText('Significado')).toBeVisible();

  // Should have a "Ver forma" button to watch the video
  await expect(page.getByRole('button', { name: /Ver forma/i })).toBeVisible();
});
