import { test, expect, Page } from '@playwright/test';

const BASELINE_DIR = 'tests/screenshots/baseline';

/**
 * Visual Regression Tests using Playwright's built-in screenshot API.
 *
 * To UPDATE baselines:  UPDATE_SCREENSHOTS=1 npx playwright test tests/e2e/visual-regression.spec.ts
 * To run comparison:   npx playwright test tests/e2e/visual-regression.spec.ts
 */

test.describe('Visual Regression — Light Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Force light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
  });

  test('Hero section screenshot (light)', async ({ page }) => {
    const section = page.locator('section#hero');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(section).toHaveScreenshot(`${BASELINE_DIR}/light/hero.png`);
  });

  test('About section screenshot (light)', async ({ page }) => {
    const section = page.locator('section#about');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(section).toHaveScreenshot(`${BASELINE_DIR}/light/about.png`);
  });

  test('Skills section screenshot (light)', async ({ page }) => {
    const section = page.locator('section#skills');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(section).toHaveScreenshot(`${BASELINE_DIR}/light/skills.png`);
  });

  test('Projects section screenshot (light)', async ({ page }) => {
    const section = page.locator('section#projects');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(section).toHaveScreenshot(`${BASELINE_DIR}/light/projects.png`);
  });
});

test.describe('Visual Regression — Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Force dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
  });

  test('Hero section screenshot (dark)', async ({ page }) => {
    const section = page.locator('section#hero');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(section).toHaveScreenshot(`${BASELINE_DIR}/dark/hero.png`);
  });

  test('About section screenshot (dark)', async ({ page }) => {
    const section = page.locator('section#about');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(section).toHaveScreenshot(`${BASELINE_DIR}/dark/about.png`);
  });

  test('Skills section screenshot (dark)', async ({ page }) => {
    const section = page.locator('section#skills');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(section).toHaveScreenshot(`${BASELINE_DIR}/dark/skills.png`);
  });

  test('Projects section screenshot (dark)', async ({ page }) => {
    const section = page.locator('section#projects');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(section).toHaveScreenshot(`${BASELINE_DIR}/dark/projects.png`);
  });
});

test.describe('Visual Layout Integrity', () => {
  test('no horizontal overflow on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);
  });

  test('all sections visible on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    for (const id of ['hero', 'about', 'skills', 'projects', 'youtube', 'contact']) {
      const section = page.locator(`section#${id}`);
      const count = await section.count();
      if (count > 0) {
        await expect(section).toBeVisible();
      }
    }
  });

  test('all sections visible on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    for (const id of ['hero', 'about', 'skills', 'projects', 'youtube', 'contact']) {
      const section = page.locator(`section#${id}`);
      const count = await section.count();
      if (count > 0) {
        await expect(section).toBeVisible();
      }
    }
  });
});
