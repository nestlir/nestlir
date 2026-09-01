import { test, expect } from '@playwright/test';

test('core navigation flow works', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/nomad-quiet-kyoto/');

  await expect(page).toHaveTitle(/NOMAD — Quiet Kyoto/);
  await page.getByRole('link', {name: 'Explore'}).click();
  await expect(page).toHaveURL(/#explore$/);
  await expect(page.getByText('Find your')).toBeVisible();

  await page.getByRole('link', {name: 'Eat'}).click();
  await expect(page).toHaveURL(/#eat$/);
  await expect(page.getByText('Taste the city')).toBeVisible();

  await page.getByRole('link', {name: /My Trip/}).click();
  await expect(page).toHaveURL(/#trip$/);
  await expect(page.getByText('Keep the day')).toBeVisible();
});
