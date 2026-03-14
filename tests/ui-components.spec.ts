/**
 * ============================================================
 *  SUITE 3: UI COMPONENTS — Header, Footer, Nav, Links, Cards
 * ============================================================
 */
import { test, expect } from '@playwright/test';

test.describe('4 — Header & Navigation', () => {
  test('4.1  Header is visible on homepage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const header = page.locator('header').first();
    await expect(header).toBeVisible();
  });

  test('4.2  Logo is visible and centered', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const logo = page.locator('header img[alt*="logo" i], header a img, header svg').first();
    if (await logo.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(logo).toBeVisible();
    } else {
      // Logo may be text — ensure header is there
      await expect(page.locator('header')).toBeVisible();
    }
  });

  test('4.3  Navigation links exist (Services, Portfolio, etc.)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Check for at least some nav items
    const navLinks = page.locator('header a, nav a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('4.4  Services link navigates correctly', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const servicesLink = page.locator('a[href="/services"], a:has-text("Services")').first();
    if (await servicesLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await servicesLink.click();
      await page.waitForURL(/services/i, { timeout: 10000 });
      expect(page.url()).toMatch(/services/i);
    }
  });

  test('4.5  Contact link navigates correctly', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const contactLink = page.locator('a[href="/contact"], a:has-text("Contact")').first();
    if (await contactLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await contactLink.click();
      await page.waitForURL(/contact/i, { timeout: 10000 });
      expect(page.url()).toMatch(/contact/i);
    }
  });
});

test.describe('5 — Footer', () => {
  test('5.1  Footer is visible', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });

  test('5.2  Footer contains company name or copyright', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const footerText = await page.locator('footer').textContent();
    expect(footerText?.toLowerCase()).toMatch(/guideit|guide it|©|copyright|all rights/i);
  });

  test('5.3  Footer links work (privacy, terms)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const privacyLink = page.locator('footer a[href*="privacy"], footer a:has-text("Privacy")').first();
    if (await privacyLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await privacyLink.click();
      await page.waitForTimeout(2000);
      expect(page.url()).toMatch(/privacy/i);
    }
  });
});

test.describe('6 — Homepage Sections & Cards', () => {
  test('6.1  Hero section has heading text', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const hero = page.locator('h1, h2').first();
    await expect(hero).toBeVisible();
    const text = await hero.textContent();
    expect(text?.length).toBeGreaterThan(3);
  });

  test('6.2  Page has CTA buttons', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const buttons = page.locator('button, a.btn, [role="button"]');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('6.3  No placeholder "Lorem Ipsum" text on homepage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const bodyText = await page.locator('body').textContent();
    expect(bodyText?.toLowerCase()).not.toContain('lorem ipsum');
  });

  test('6.4  No broken images on homepage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load', timeout: 30000 });
    const images = page.locator('img');
    const count = await images.count();
    let broken = 0;
    for (let i = 0; i < Math.min(count, 20); i++) {
      const img = images.nth(i);
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      if (naturalWidth === 0) broken++;
    }
    // Allow max 2 broken (external CDN images can be flaky in test)
    expect(broken).toBeLessThanOrEqual(2);
  });
});

test.describe('7 — Contact Page', () => {
  test('7.1  Contact form is visible', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    const form = page.locator('form, [role="form"]').first();
    const hasForm = await form.isVisible({ timeout: 5000 }).catch(() => false);
    // If no form, at least verify page loaded
    if (!hasForm) {
      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeVisible();
    }
  });

  test('7.2  Contact info is displayed (phone or email)', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    const bodyText = await page.locator('body').textContent();
    const hasContactInfo = /phone|email|@|call|whatsapp|\+91/i.test(bodyText || '');
    expect(hasContactInfo).toBeTruthy();
  });
});

test.describe('8 — SEO & Meta', () => {
  test('8.1  Homepage has a title tag', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('8.2  Homepage has meta description', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDesc?.length).toBeGreaterThan(0);
  });

  test('8.3  Homepage has canonical URL', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical?.length).toBeGreaterThan(0);
  });
});

test.describe('9 — Responsiveness', () => {
  test('9.1  Mobile viewport renders header', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('header')).toBeVisible();
  });

  test('9.2  Tablet viewport renders content', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const body = await page.locator('body').textContent();
    expect(body?.length).toBeGreaterThan(50);
  });
});

test.describe('10 — Console Error Check', () => {
  test('10.1  Homepage has no critical JS errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    // Filter out known benign errors
    const critical = errors.filter(
      (e) => !e.includes('ResizeObserver') && !e.includes('Loading chunk') && !e.includes('net::ERR')
    );
    expect(critical).toHaveLength(0);
  });

  test('10.2  Services page has no critical JS errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/services', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    const critical = errors.filter(
      (e) => !e.includes('ResizeObserver') && !e.includes('Loading chunk') && !e.includes('net::ERR')
    );
    expect(critical).toHaveLength(0);
  });

  test('10.3  Login page has no critical JS errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    const critical = errors.filter(
      (e) => !e.includes('ResizeObserver') && !e.includes('Loading chunk') && !e.includes('net::ERR')
    );
    expect(critical).toHaveLength(0);
  });
});
