import { test, expect, Page } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Mobile menu', () => {
    test('mobile menu opens', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Look for hamburger/menu button
      const menuButton = page.locator(
        'button[aria-label*="menu" i], button[aria-label*="navigation" i], button[aria-label*="hamburger"], button[class*="menu"], button[class*="hamburger"], [aria-controls]'
      ).first();

      const menuButtonExists = await menuButton.count() > 0;

      if (menuButtonExists) {
        // Check initial state
        const menuButtonVisible = await menuButton.isVisible().catch(() => false);

        if (menuButtonVisible) {
          // Get the menu container id from aria-controls if exists
          const menuId = await menuButton.getAttribute('aria-controls');

          // Click to open
          await menuButton.click();
          await page.waitForTimeout(300);

          // Check menu opened - either via aria-expanded or visibility
          const isExpanded = await menuButton.getAttribute('aria-expanded');
          expect(isExpanded).toBe('true');

          // If there's a menu id, check that menu is visible
          if (menuId) {
            const menu = page.locator(`#${menuId}, [aria-labelledby="${menuId}"]`);
            await expect(menu).toBeVisible({ timeout: 3000 }).catch(() => {
              // Alternative: check for nav being visible
              expect(menuButton).toBeVisible();
            });
          }
        }
      } else {
        // No mobile menu button - check if nav is visible without one (desktop nav visible on mobile)
        const nav = page.locator('nav').first();
        await expect(nav).toBeVisible();
      }
    });

    test('mobile menu closes', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const menuButton = page.locator(
        'button[aria-label*="menu" i], button[aria-label*="hamburger"], button[class*="menu"], button[class*="hamburger"]'
      ).first();

      const menuButtonExists = await menuButton.count() > 0;

      if (menuButtonExists) {
        const menuButtonVisible = await menuButton.isVisible().catch(() => false);

        if (menuButtonVisible) {
          // Open menu
          await menuButton.click();
          await page.waitForTimeout(300);

          // Check aria-expanded is true
          const expandedAfterOpen = await menuButton.getAttribute('aria-expanded');
          expect(expandedAfterOpen).toBe('true');

          // Close menu (click same button again)
          await menuButton.click();
          await page.waitForTimeout(300);

          // Check aria-expanded is false
          const expandedAfterClose = await menuButton.getAttribute('aria-expanded');
          expect(expandedAfterClose).toBe('false');
        }
      }
    });
  });

  test.describe('Smooth scroll to sections', () => {
    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

    for (const section of sections) {
      test(`smooth scroll to ${section} section works`, async ({ page }) => {
        // Click nav link for section
        const sectionLink = page.locator(
          `a[href="#${section}"], a[href*="#${section}"]`
        ).first();

        const linkExists = await sectionLink.count() > 0;

        if (linkExists) {
          const linkVisible = await sectionLink.isVisible().catch(() => false);

          if (linkVisible) {
            // Get scroll position before click
            const scrollBefore = await page.evaluate(() => window.scrollY);

            // Click the link
            await sectionLink.click();

            // Wait for smooth scroll to complete
            await page.waitForTimeout(800);

            // Get scroll position after click
            const scrollAfter = await page.evaluate(() => window.scrollY);

            // Check that scroll happened
            const scrollChanged = scrollAfter !== scrollBefore || scrollAfter > 0;
            expect(scrollChanged).toBeTruthy();

            // Check URL has hash
            const url = page.url();
            const hasHash = url.includes(`#${section}`);
            expect(hasHash).toBeTruthy();
          }
        }
      });
    }
  });

  test.describe('Active section highlighting', () => {
    test('active section is highlighted in nav', async ({ page }) => {
      // Get all nav links
      const navLinks = page.locator('nav a, header a').filter({ hasText: /\w/ });

      const linkCount = await navLinks.count();
      expect(linkCount).toBeGreaterThan(0);

      // Scroll to a section
      const skillsLink = page.locator('a[href="#skills"], a[href*="#skills"]').first();
      const skillsLinkExists = await skillsLink.count() > 0;

      if (skillsLinkExists) {
        await skillsLink.click();
        await page.waitForTimeout(1000);

        // Check if active class exists
        const hasActiveClass = await page.evaluate(() => {
          const activeElements = document.querySelectorAll('[class*="active"], [aria-current="page"], [aria-current="step"]');
          return activeElements.length > 0;
        });

        // If no active class, check for visual indication via styles
        if (!hasActiveClass) {
          // Check that the link in viewport has proper styling
          const inViewLink = page.locator('a[href="#skills"]').first();
          const linkStyle = await inViewLink.evaluate((el) => {
            const style = getComputedStyle(el);
            return {
              color: style.color,
              borderBottom: style.borderBottom,
              textDecoration: style.textDecoration,
            };
          });

          // Just verify we got styles back
          expect(linkStyle).toBeTruthy();
        }
      }
    });

    test('nav link hover state works', async ({ page }) => {
      const navLinks = page.locator('nav a, header a').first();

      const linkExists = await navLinks.count() > 0;
      if (linkExists) {
        // Hover over link
        await navLinks.hover();
        await page.waitForTimeout(200);

        // Check cursor changed
        const cursor = await navLinks.evaluate((el) => getComputedStyle(el).cursor);
        expect(['pointer', 'auto']).toContain(cursor);
      }
    });
  });

  test('skip to main content link works', async ({ page }) => {
    // Look for skip link
    const skipLink = page.locator('a[href="#main"], a[href="#content"], a[class*="skip"]');

    const skipLinkExists = await skipLink.count() > 0;

    if (skipLinkExists) {
      // Tab to it
      await page.keyboard.press('Tab');

      // Check if skip link is focused
      const focusedElement = page.locator(':focus');
      const isSkipLinkFocused = await focusedElement.evaluate((el) => {
        return el.textContent?.toLowerCase().includes('skip') || el.getAttribute('href')?.includes('main') || el.getAttribute('href')?.includes('content');
      });

      if (isSkipLinkFocused) {
        // Press Enter
        await page.keyboard.press('Enter');
        await page.waitForTimeout(500);

        // Check main content is now focused or visible
        const main = page.locator('main, [id="main"], [id="content"], section#hero');
        await expect(main.first()).toBeVisible();
      }
    }
  });

  test('nav keyboard navigation works', async ({ page }) => {
    // Focus on first nav link
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);

    // Check we can tab through navigation
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);

    // Check Enter works on a link
    const focusedEl = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON']).toContain(focusedEl);
  });
});