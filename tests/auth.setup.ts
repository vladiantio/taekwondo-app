import { test as setup, expect } from '@playwright/test';

setup('login', async ({ page }) => {
  await page.goto('/');

  // Fill in the login form
  await page
    .getByRole('textbox', { name: 'Correo electrónico' })
    .fill('example@example.com');
  await page.locator('#login-password').fill('example');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  // Wait for the login to complete — we know we're in when we see this heading
  await expect(page.getByRole('heading', { name: 'Exámenes' })).toBeVisible();

  // Save the browser state (localStorage, cookies) so other tests can reuse it
  await page.context().storageState({ path: 'storageState.json' });
});
