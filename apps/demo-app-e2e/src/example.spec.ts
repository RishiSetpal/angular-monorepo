import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Wait for page to fully load
  await page.waitForLoadState('networkidle');
  
  // Expect h1 to contain a substring (use first() since there are multiple h1 elements)
  expect(await page.locator('h1').first().innerText()).toContain('Angular Monorepo UI Library');
});

test('page loads without errors', async ({ page }) => {
  await page.goto('/');
  
  // Wait for Angular to bootstrap
  await page.waitForLoadState('networkidle');
  
  // Wait a bit for Material components to render
  await page.waitForTimeout(2000);
  
  // Check that the page has content
  const body = await page.locator('body').innerText();
  expect(body).toContain('Angular Monorepo');
  expect(body).toContain('UI Components');
});

test('demo app loads', async ({ page }) => {
  await page.goto('/');
  
  // Wait for the app to load
  await page.waitForLoadState('networkidle');
  
  // Verify the app-container exists
  const container = page.locator('.demo-container, .mat-mdc-tab-group');
  await expect(container.first()).toBeVisible({ timeout: 10000 });
});
