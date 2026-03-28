import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Angular Monorepo UI Library');
});

test('has tabs', async ({ page }) => {
  await page.goto('/');

  // Check that tabs exist
  await expect(page.locator('mat-tab')).toHaveCount(4);
  await expect(page.locator('mat-tab-label').first()).toContainText('UI Components');
});

test('dynamic table works', async ({ page }) => {
  await page.goto('/');

  // Navigate to Dynamic Table tab
  await page.locator('mat-tab-label').nth(2).click();

  // Check table exists
  await expect(page.locator('lib-dynamic-table')).toBeVisible();
});
