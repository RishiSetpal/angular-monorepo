import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain a substring (use first() since there are multiple h1 elements)
  expect(await page.locator('h1').first().innerText()).toContain('Angular Monorepo UI Library');
});

test('has tabs', async ({ page }) => {
  await page.goto('/');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check that tabs exist - use mat-tab-label instead of mat-tab
  const tabs = page.locator('.mat-mdc-tab-label');
  await expect(tabs).toHaveCount(4);
  await expect(tabs.first()).toContainText('UI Components');
});

test('dynamic table works', async ({ page }) => {
  await page.goto('/');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Check table exists
  await expect(page.locator('lib-dynamic-table')).toBeVisible();
});
