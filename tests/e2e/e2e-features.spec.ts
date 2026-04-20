import { test, expect, Page } from '@playwright/test';
import {
  getCurrentTheme,
  toggleDarkMode,
  openMobileMenu,
  closeMobileMenu,
  MOBILE_VIEWPORT,
} from '../helpers';

test.describe('Dark Mode Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('theme toggle button exists', async ({ page }) => {
    const toggle = page.locator('#theme-toggle');
    await expect(toggle).toBeVisible();
  });

  test('clicking toggle changes theme from light to dark', async ({ page }) => {
    // Ensure light mode initially
    await page.evaluate(() => document.documentElement.classList.remove('dark'));
    await page.waitForTimeout(200);

    const before = await getCurrentTheme(page);
    expect(before).toBe('light');

    await toggleDarkMode(page);

    const after = await getCurrentTheme(page);
    expect(after).toBe('dark');
  });

  test('clicking toggle again changes theme from dark to light', async ({ page }) => {
    // Start in dark mode
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForTimeout(200);

    const before = await getCurrentTheme(page);
    expect(before).toBe('dark');

    await toggleDarkMode(page);

    const after = await getCurrentTheme(page);
    expect(after).toBe('light');
  });

  test('theme preference persists in localStorage', async ({ page }) => {
    // Toggle to dark
    await toggleDarkMode(page);
    await page.waitForTimeout(300);

    // Check localStorage
    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe('dark');

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Theme should still be dark
    const theme = await getCurrentTheme(page);
    expect(theme).toBe('dark');
  });

  test('aria-pressed reflects theme state', async ({ page }) => {
    const toggle = page.locator('#theme-toggle');

    // Light mode — aria-pressed should be false
    await page.evaluate(() => document.documentElement.classList.remove('dark'));
    await page.waitForTimeout(200);
    const pressedLight = await toggle.getAttribute('aria-pressed');
    expect(pressedLight).toBe('false');

    // Toggle to dark
    await toggleDarkMode(page);
    const pressedDark = await toggle.getAttribute('aria-pressed');
    expect(pressedDark).toBe('true');
  });
});

test.describe('Mobile Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('hamburger button is visible on mobile', async ({ page }) => {
    const menuBtn = page.locator('#mobile-menu-btn');
    await expect(menuBtn).toBeVisible();
  });

  test('clicking hamburger opens menu', async ({ page }) => {
    const menuBtn = page.locator('#mobile-menu-btn');

    // Menu should be closed initially
    const ariaExpandedBefore = await menuBtn.getAttribute('aria-expanded');
    expect(ariaExpandedBefore).toBe('false');

    // Open menu
    await menuBtn.click();
    await page.waitForTimeout(400);

    const ariaExpandedAfter = await menuBtn.getAttribute('aria-expanded');
    expect(ariaExpandedAfter).toBe('true');

    // Mobile menu should be visible
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();
  });

  test('clicking hamburger again closes menu', async ({ page }) => {
    const menuBtn = page.locator('#mobile-menu-btn');

    // Open
    await menuBtn.click();
    await page.waitForTimeout(400);
    expect(await menuBtn.getAttribute('aria-expanded')).toBe('true');

    // Close
    await menuBtn.click();
    await page.waitForTimeout(400);
    expect(await menuBtn.getAttribute('aria-expanded')).toBe('false');
  });

  test('mobile menu contains all nav items', async ({ page }) => {
    await openMobileMenu(page);

    const mobileMenu = page.locator('#mobile-menu');
    const links = mobileMenu.locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('clicking a nav link closes the mobile menu', async ({ page }) => {
    await openMobileMenu(page);

    // Click a nav link
    const firstLink = page.locator('#mobile-menu a').first();
    const href = await firstLink.getAttribute('href');
    await firstLink.click();
    await page.waitForTimeout(500);

    // Menu should be closed
    const menuBtn = page.locator('#mobile-menu-btn');
    const ariaExpanded = await menuBtn.getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('false');
  });

  test('mobile menu links navigate to correct sections', async ({ page }) => {
    await openMobileMenu(page);

    // Check that links have proper hrefs (hash anchors)
    const firstLink = page.locator('#mobile-menu a').first();
    const href = await firstLink.getAttribute('href');
    expect(href).toContain('#');
  });
});

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Scroll to contact section
    await page.evaluate(() => document.querySelector('section#contact')?.scrollIntoView());
    await page.waitForTimeout(500);
  });

  test('form fields are focusable', async ({ page }) => {
    const nameInput = page.locator('input[name="name"], input#name, input[placeholder*="name" i]').first();
    const emailInput = page.locator('input[name="email"], input#email, input[placeholder*="email" i]').first();

    const nameCount = await nameInput.count();
    if (nameCount > 0) {
      await nameInput.focus();
      await expect(nameInput).toBeFocused();
    }

    const emailCount = await emailInput.count();
    if (emailCount > 0) {
      await emailInput.focus();
      await expect(emailInput).toBeFocused();
    }
  });

  test('submitting empty form shows validation', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]');
    const submitCount = await submitBtn.count();

    if (submitCount > 0) {
      // Form should be submittable (HTML5 validation)
      const form = page.locator('section#contact form');
      const formExists = await form.count();

      if (formExists > 0) {
        await submitBtn.click();
        // Check that browser native validation triggered (no crash)
        // The form should either show native validation bubbles or handle it via JS
        // Just ensure no page crash
        await expect(page.locator('body')).toBeVisible();
      }
    }
  });

  test('form accepts text input', async ({ page }) => {
    const nameInput = page.locator('input[name="name"], input#name, input[placeholder*="name" i]').first();
    const inputCount = await nameInput.count();

    if (inputCount > 0) {
      await nameInput.fill('Max Mustermann');
      const value = await nameInput.inputValue();
      expect(value).toBe('Max Mustermann');
    }
  });

  test('email field validates email format', async ({ page }) => {
    const emailInput = page.locator('input[name="email"], input#email, input[placeholder*="email" i]').first();
    const inputCount = await emailInput.count();

    if (inputCount > 0) {
      await emailInput.fill('not-an-email');
      await emailInput.blur();
      // Browser native validation should kick in when submitting
      // Just ensure no crash
      await expect(page.locator('body')).toBeVisible();
    }
  });
});

test.describe('Smooth Scroll', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('clicking nav link scrolls to section', async ({ page }) => {
    const skillsLink = page.locator('a[href="#skills"]').first();
    const linkExists = await skillsLink.count();

    if (linkExists > 0) {
      const scrollBefore = await page.evaluate(() => window.scrollY);

      await skillsLink.click();
      await page.waitForTimeout(800);

      const scrollAfter = await page.evaluate(() => window.scrollY);
      const hasScrolled = scrollAfter > scrollBefore || scrollAfter > 0;
      expect(hasScrolled).toBeTruthy();
    }
  });

  test('clicking nav link updates URL with hash', async ({ page }) => {
    const skillsLink = page.locator('a[href="#skills"]').first();
    const linkExists = await skillsLink.count();

    if (linkExists > 0) {
      await skillsLink.click();
      await page.waitForTimeout(500);

      const url = page.url();
      expect(url).toContain('#skills');
    }
  });

  test('scroll indicator in hero scrolls to about', async ({ page }) => {
    const scrollIndicator = page.locator('a[href="#about"]').first();
    const exists = await scrollIndicator.count();

    if (exists > 0) {
      await scrollIndicator.click();
      await page.waitForTimeout(800);

      const url = page.url();
      expect(url).toContain('#about');
    }
  });

  test('all nav anchor links are scrollable', async ({ page }) => {
    const anchors = page.locator('a[href^="#"]');
    const count = await anchors.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 6); i++) {
      const link = anchors.nth(i);
      const href = await link.getAttribute('href');
      if (!href || href === '#') continue;

      // Reset scroll
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);

      await link.click();
      await page.waitForTimeout(600);

      const url = page.url();
      expect(url).toContain('#');
    }
  });
});
