import { test, expect } from '@playwright/test';

test('profile page shows user info', async ({ page }) => {
  await page.goto('/account');

  await expect(page.getByRole('heading', { name: 'Perfil' })).toBeVisible();

  // Should show edit and logout buttons
  await expect(
    page.getByRole('button', { name: /Editar perfil/i })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: /Cerrar sesión/i })
  ).toBeVisible();
});

test('edit profile page has email and password fields', async ({ page }) => {
  await page.goto('/account');

  await page.getByRole('button', { name: /Editar perfil/i }).click();

  // Should see editable fields
  await expect(page.getByLabel(/Correo/i)).toBeVisible();
  await expect(page.locator('#password-input')).toBeVisible();

  // Should have save and cancel buttons
  await expect(page.getByRole('button', { name: /Guardar/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Cancelar/i })).toBeVisible();
});

test('cancel on edit profile returns to profile page', async ({ page }) => {
  await page.goto('/account');
  await page.getByRole('button', { name: /Editar perfil/i }).click();

  await page.getByRole('button', { name: /Cancelar/i }).click();

  await expect(page.getByRole('heading', { name: 'Perfil' })).toBeVisible();
});

test('logout shows confirmation and can be cancelled', async ({ page }) => {
  await page.goto('/account');

  await page.getByRole('button', { name: /Cerrar sesión/i }).click();

  // Should show confirmation drawer
  await expect(page.getByText(/¿Deseas cerrar la sesión/i)).toBeVisible();

  // Click "No" to cancel
  await page.getByRole('button', { name: 'No' }).click();

  // Should still be on profile page
  await expect(page.getByRole('heading', { name: 'Perfil' })).toBeVisible();
});
