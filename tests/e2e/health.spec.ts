import { test, expect } from '@playwright/test';
import { checkLinkHealth } from '../helpers';

const EXTERNAL_LINKS = [
  'https://github.com/davidschuchert',
  'https://linkedin.com/in/david-schuchert-0ab892283/',
  'https://www.xing.com/profile/David_Schuchert',
  'https://www.youtube.com/@davidschuchert',
  'https://dbe.academy',
];

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/davidschuchert' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/david-schuchert-0ab892283/' },
  { name: 'Xing', url: 'https://www.xing.com/profile/David_Schuchert' },
  { name: 'YouTube', url: 'https://www.youtube.com/@davidschuchert' },
  { name: 'DBE-Academy', url: 'https://dbe.academy' },
];

test.describe('External Link Health Checks', () => {
  for (const link of SOCIAL_LINKS) {
    test(`${link.name} link is reachable (${link.url})`, async ({ page }) => {
      const result = await checkLinkHealth(page, link.url);
      expect(result.ok, `Expected ${link.name} to be reachable, got status ${result.status}`).toBe(true);
      expect(result.status).toBeLessThan(400);
    });
  }
});

test.describe('External Links on Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('all external links on page return 2xx/3xx status', async ({ page }) => {
    const externalLinks = page.locator('a[href^="https://"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);

    const failedLinks: string[] = [];
    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      const href = await link.getAttribute('href');
      if (!href || href.includes('mailto:') || href.includes('tel:')) continue;

      const result = await checkLinkHealth(page, href);
      if (!result.ok) {
        failedLinks.push(`${href} → status ${result.status}`);
      }
    }

    expect(failedLinks, `Failed links: ${failedLinks.join(', ')}`).toHaveLength(0);
  });

  test('no broken rel="noopener" links exist', async ({ page }) => {
    // Verify that all external links have proper rel attribute
    const externalLinks = page.locator('a[href^="https://"]');
    const count = await externalLinks.count();

    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      const href = await link.getAttribute('href');
      if (!href || href.includes('mailto:') || href.includes('tel:')) continue;

      const rel = await link.getAttribute('rel');
      // Should have noopener for security
      if (href.includes('github') || href.includes('linkedin') || href.includes('youtube')) {
        expect(rel).toContain('noopener');
      }
    }
  });

  test('GitHub link has correct href on hero section', async ({ page }) => {
    const githubLink = page.locator('a[href*="github.com/davidschuchert"]').first();
    await expect(githubLink).toBeVisible();
    const href = await githubLink.getAttribute('href');
    expect(href).toBe('https://github.com/davidschuchert');
  });

  test('LinkedIn link has correct href', async ({ page }) => {
    const linkedinLink = page.locator('a[href*="linkedin.com/in/david-schuchert"]').first();
    await expect(linkedinLink).toBeVisible();
    const href = await linkedinLink.getAttribute('href');
    expect(href).toBe('https://linkedin.com/in/david-schuchert-0ab892283/');
  });

  test('footer social links all have target="_blank"', async ({ page }) => {
    const footerSocialLinks = page.locator('footer a[href^="https://"]');
    const count = await footerSocialLinks.count();

    for (let i = 0; i < count; i++) {
      const link = footerSocialLinks.nth(i);
      const target = await link.getAttribute('target');
      expect(target).toBe('_blank');
    }
  });
});
