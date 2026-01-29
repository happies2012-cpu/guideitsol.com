import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
    test('should load login page, have no errors, and allow input', async ({ page }) => {
        // 1. Go to Login Page
        await page.goto('http://localhost:5173/login');

        // 2. Check for "Sparkles is not defined" error in console
        page.on('console', msg => {
            if (msg.type() === 'error' && msg.text().includes('Sparkles is not defined')) {
                throw new Error('Critical Error: Sparkles is not defined found in console logs');
            }
        });

        // 3. Verify Page Title / Content
        await expect(page).toHaveTitle(/GuideIT/i);
        await expect(page.locator('h2', { hasText: 'Sign In' })).toBeVisible();

        // 4. Verify Inputs exist and work
        const emailInput = page.locator('input[type="email"]');
        const passwordInput = page.locator('input[type="password"]');

        await expect(emailInput).toBeVisible();
        await expect(passwordInput).toBeVisible();

        // 5. Test typing
        await emailInput.fill('testuser@example.com');
        await passwordInput.fill('password123');

        await expect(emailInput).toHaveValue('testuser@example.com');
    });
});
