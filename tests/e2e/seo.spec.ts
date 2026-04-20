import { test, expect } from '@playwright/test';
import { getSEOMeta } from '../helpers';

test.describe('SEO Meta Tags', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('title tag is present and non-empty', async ({ page }) => {
    const seo = await getSEOMeta(page);
    expect(seo.title).toBeTruthy();
    expect(seo.title.length).toBeGreaterThan(5);
  });

  test('description meta tag is present', async ({ page }) => {
    const seo = await getSEOMeta(page);
    expect(seo.description).toBeTruthy();
    expect(seo.description.length).toBeGreaterThan(20);
  });

  test('canonical URL is correct', async ({ page }) => {
    const seo = await getSEOMeta(page);
    expect(seo.canonical).toBe('https://david-schuchert.de');
  });

  test('og:title matches title tag', async ({ page }) => {
    const seo = await getSEOMeta(page);
    expect(seo.ogTitle).toBe(seo.title);
  });

  test('og:description matches description meta tag', async ({ page }) => {
    const seo = await getSEOMeta(page);
    expect(seo.ogDescription).toBe(seo.description);
  });

  test('og:image is set', async ({ page }) => {
    const seo = await getSEOMeta(page);
    expect(seo.ogImage).toBeTruthy();
    expect(seo.ogImage.length).toBeGreaterThan(0);
  });

  test('og:type is website', async ({ page }) => {
    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'website');
  });

  test('og:locale is de_DE', async ({ page }) => {
    const ogLocale = page.locator('meta[property="og:locale"]');
    await expect(ogLocale).toHaveAttribute('content', 'de_DE');
  });

  test('og:site_name is set', async ({ page }) => {
    const ogSiteName = page.locator('meta[property="og:site_name"]');
    await expect(ogSiteName).toHaveAttribute('content', 'David Schuchert Portfolio');
  });

  test('twitter:card is summary_large_image', async ({ page }) => {
    const twitterCard = page.locator('meta[name="twitter:card"]');
    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
  });

  test('twitter:site is @davidschuchert', async ({ page }) => {
    const twitterSite = page.locator('meta[name="twitter:site"]');
    await expect(twitterSite).toHaveAttribute('content', '@davidschuchert');
  });

  test('robots meta tag is set', async ({ page }) => {
    const seo = await getSEOMeta(page);
    expect(seo.robots).toBeTruthy();
    expect(seo.robots).toContain('index');
    expect(seo.robots).toContain('follow');
  });

  test('theme-color meta tag is present', async ({ page }) => {
    const themeColor = page.locator('meta[name="theme-color"]');
    await expect(themeColor).toHaveAttribute('content', '#1a1a2e');
  });

  test('favicon link is present', async ({ page }) => {
    const favicon = page.locator('link[rel="icon"]');
    await expect(favicon.first()).toHaveAttribute('href', '/favicon.svg');
  });

  test('apple-touch-icon link is present', async ({ page }) => {
    const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]');
    await expect(appleTouchIcon).toHaveAttribute('href', '/favicon.svg');
  });

  test('title is under 60 chars (SEO best practice)', async ({ page }) => {
    const seo = await getSEOMeta(page);
    expect(seo.title.length).toBeLessThanOrEqual(60);
  });

  test('description is under 160 chars (SEO best practice)', async ({ page }) => {
    const seo = await getSEOMeta(page);
    expect(seo.description.length).toBeLessThanOrEqual(160);
  });

  test('keywords meta tag is present and contains key terms', async ({ page }) => {
    const keywords = page.locator('meta[name="keywords"]');
    await expect(keywords).toHaveAttribute('content', /David Schuchert/);
    await expect(keywords).toHaveAttribute('content', /Full-Stack Developer/);
  });
});

test.describe('Structured Data (JSON-LD)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('JSON-LD script is present in head', async ({ page }) => {
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    expect(count).toBeGreaterThan(0);
  });

  test('JSON-LD contains expected Person schema fields', async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]').first();
    const content = await jsonLd.textContent();
    const data = JSON.parse(content || '{}');

    // Should have @context
    expect(data['@context']).toBeTruthy();

    // Should have name
    expect(data.name).toBeTruthy();
    expect(data.name).toContain('David');
  });

  test('JSON-LD is valid JSON', async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]').first();
    const content = await jsonLd.textContent();
    expect(() => JSON.parse(content || '')).not.toThrow();
  });
});

test.describe('Canonical & Indexing', () => {
  test('canonical link is self-referencing', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const canonical = page.locator('link[rel="canonical"]');
    const href = await canonical.getAttribute('href');
    expect(href).toBe('https://david-schuchert.de');
  });

  test('page is not noindex', async ({ page }) => {
    await page.goto('/');
    const robots = page.locator('meta[name="robots"]');
    const content = await robots.getAttribute('content') as string;
    expect(content).not.toContain('noindex');
  });
});
