import { test, expect } from '@playwright/test';

test('renders the portfolio and navigates to the work section', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('link', { name: /проекты|explore projects/i }).click();
  await expect(page.locator('#work')).toBeInViewport();
  await expect(page.locator('.project-card')).toHaveCount(10);
});

test('filters projects and opens a detailed case study', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /учебные проекты|study projects/i }).click();
  await expect(page.locator('.project-card')).toHaveCount(5);
  await page.getByRole('button', { name: /open case|открыть кейс/i }).first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('heading', { level: 2 }).last()).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('filters the platform category independently', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /платформы и лаборатории|platforms & labs/i }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(page.locator('.project-card h3')).toContainText('50 Projects Lab');
});

test('search narrows the catalogue and language switch works', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder(/название или технология|name or technology/i).fill('redux');
  await expect(page.locator('.project-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'EN' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('From the first interface');
});

test('mobile layout has no horizontal overflow and menu is operable', async ({ page }, testInfo) => {
  await page.goto('/');
  if (testInfo.project.name.includes('mobile')) {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.waitForTimeout(50);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
    await page.getByRole('button', { name: /open menu|открыть меню/i }).click();
    await expect(page.getByRole('navigation', { name: /main navigation|основная навигация/i })).toBeVisible();
  }
});

test('architecture nodes expose selectable layers', async ({ page }) => {
  await page.goto('/');
  const api = page.getByRole('button', { name: /API boundary/i });
  await api.click();
  await expect(api).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.architecture-detail')).toContainText(/No active server|contract/i);
});
