import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(5000);
  
  const h1Count = await page.locator('h1').count();
  expect(h1Count).toBeGreaterThan(0);
});

test('demo app loads', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(5000);
  
  const bodyText = await page.locator('body').innerText();
  expect(bodyText).toContain('Angular');
});

test('has tab group', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(5000);
  
  const content = await page.content();
  expect(content).toContain('UI Components');
  expect(content).toContain('Dynamic Form');
  expect(content).toContain('Dynamic Table');
});
