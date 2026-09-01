import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/nomad-quiet-kyoto/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('core page navigation works', async ({ page }) => {
  await expect(page).toHaveTitle(/NOMAD — Quiet Kyoto/);
  await page.getByRole('link', { name: 'Explore' }).click();
  await expect(page).toHaveURL(/#explore$/);
  await expect(page.getByRole('heading', { name: /Find your/ })).toBeVisible();
  await page.getByRole('link', { name: 'Eat' }).click();
  await expect(page).toHaveURL(/#eat$/);
  await expect(page.getByRole('heading', { name: /Taste the city/ })).toBeVisible();
  await page.getByRole('link', { name: /My Trip/ }).click();
  await expect(page).toHaveURL(/#trip$/);
  await expect(page.getByRole('heading', { name: /Keep the day/ })).toBeVisible();
});

test('place detail and itinerary flow works', async ({ page }) => {
  await page.getByRole('link', { name: 'Explore' }).click();
  await page.getByRole('button', { name: /Read place detail/i }).first().click();
  await expect(page).toHaveURL(/#place\//);
  await expect(page.getByRole('heading', { name: /Fushimi Inari|Higashiyama|Nishiki Market|Gion|Kamo Breakfast/ })).toBeVisible();
  const addButton = page.getByRole('button', { name: /Add to My Day/ });
  await addButton.click();
  await expect(addButton).toContainText('Remove');
  await page.getByRole('button', { name: /See My Trip/ }).click();
  await expect(page).toHaveURL(/#trip$/);
  await expect(page.locator('.trip-list article')).toHaveCount(1);
});

test('food detail and itinerary flow works', async ({ page }) => {
  await page.getByRole('link', { name: 'Eat' }).click();
  await page.getByRole('button', { name: /Open Breakfast by the Kamo/i }).click();
  await expect(page).toHaveURL(/#food\/kamo-breakfast$/);
  await expect(page.getByRole('heading', { name: /Breakfast by the Kamo/ })).toBeVisible();
  await page.getByRole('button', { name: /Add to My Trip/ }).click();
  await page.getByRole('link', { name: /My Trip/ }).click();
  await expect(page).toHaveURL(/#trip$/);
  await expect(page.getByText('Breakfast by the Kamo')).toBeVisible();
});

test('trip selection survives reload', async ({ page }) => {
  await page.getByRole('link', { name: 'Explore' }).click();
  await page.getByRole('button', { name: /Add to My Day/ }).click();
  await page.reload();
  await expect(page.getByRole('link', { name: /My Trip/ })).toContainText('1');
  await page.getByRole('link', { name: /My Trip/ }).click();
  await expect(page.locator('.trip-list article')).toHaveCount(1);
});

test('gallery image has a stable box', async ({ page }) => {
  await page.getByRole('link', { name: 'Explore' }).click();
  const image = page.locator('.place-panel-image img').first();
  await expect(image).toBeVisible();
  const box = await image.boundingBox();
  expect(box).not.toBeNull();
  expect(box.width).toBeGreaterThan(150);
  expect(box.height).toBeGreaterThan(150);
});
