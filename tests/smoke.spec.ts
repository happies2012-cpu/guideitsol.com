import { test, expect } from '@playwright/test';

// Common pages to test
const pages = [
  '/',
  '/services',
  '/portfolio',
  '/blog',
  '/contact',
  '/company/about-company',
];

test.describe('Smoke Test - Page Status 200', () => {
  for (const pagePath of pages) {
    test(`should load ${pagePath}`, async ({ page }) => {
      // Increase timeout for slow dev server
      test.setTimeout(60000);
      try {
        const response = await page.goto(pagePath, { waitUntil: 'domcontentloaded' });
        console.log(`Loaded ${pagePath}: ${response?.status()}`);
        expect(response?.status()).toBe(200);
      } catch (e) {
        console.error(`Failed to load ${pagePath}: ${e}`);
        throw e;
      }
    });
  }
});
