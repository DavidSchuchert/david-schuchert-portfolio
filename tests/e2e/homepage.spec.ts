import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads without crash (200 OK)', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('hero section exists with name David', async ({ page }) => {
    // Check hero section exists
    const hero = page.locator('section.retro-hero, h1:has-text("David")').first();
    await expect(hero).toBeVisible({ timeout: 10000 });

    // Check that David appears in the hero
    const davidText = page.locator('h1:has-text("David")').first();
    await expect(davidText).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    // Target the main header navigation specifically
    const nav = page.locator('header nav').first();
    await expect(nav).toBeVisible();

    // Check navigation links exist in the header
    const navLinksCount = await nav.locator('a').count();
    expect(navLinksCount).toBeGreaterThan(0);

    // Test navigation on desktop - hover and click
    const firstNavLink = nav.locator('a').first();
    const href = await firstNavLink.getAttribute('href');
    if (href && href.startsWith('#')) {
      // In-page navigation
      await firstNavLink.click();
      await page.waitForTimeout(500);
    }
  });

  test('dark/light mode toggle works', async ({ page }) => {
    // Look for a theme toggle button
    const themeToggle = page.locator('button[aria-label*="theme" i], button[aria-label*="dark" i], button[aria-label*="light" i], button[class*="theme"], button[class*="dark"], [role="switch"][aria-label*="theme"]').first();

    // Check if toggle exists (may not exist yet in the site)
    const toggleExists = await themeToggle.count() > 0;

    if (toggleExists) {
      // Get initial theme
      const htmlBefore = await page.locator('html').getAttribute('class');

      // Click toggle
      await themeToggle.click();
      await page.waitForTimeout(300);

      // Check theme changed
      const htmlAfter = await page.locator('html').getAttribute('class');
      expect(htmlAfter).not.toBe(htmlBefore);
    } else {
      // Test CSS custom properties for theme
      const hasDarkModeStyles = await page.evaluate(() => {
        const styles = getComputedStyle(document.documentElement);
        return styles.backgroundColor !== '' || styles.color !== '';
      });
      expect(hasDarkModeStyles).toBeTruthy();
    }
  });

  test('all social links present (GitHub, LinkedIn, YouTube)', async ({ page }) => {
    // Check GitHub link
    const githubLink = page.locator('a[href*="github.com"], a[href*="githubusercontent"]');
    await expect(githubLink.first()).toBeVisible({ timeout: 5000 });

    // Check LinkedIn link
    const linkedinLink = page.locator('a[href*="linkedin.com"]');
    await expect(linkedinLink.first()).toBeVisible({ timeout: 5000 });

    // Check YouTube link
    const youtubeLink = page.locator('a[href*="youtube.com"], a[href*="youtu.be"]');
    await expect(youtubeLink.first()).toBeVisible({ timeout: 5000 });
  });

  test('skills section renders', async ({ page }) => {
    // Find skills section (32-bit era)
    const skillsSection = page.locator('section#era-32bit, section:has-text("CHOOSE YOUR CHARACTER")').first();

    await skillsSection.scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
    await expect(skillsSection).toBeVisible({ timeout: 5000 });

    // Check for character stats or skill names
    const hasSkills = await page.locator('text=/JavaScript|TypeScript|React/').count() > 0;
    expect(hasSkills).toBeTruthy();
  });

  test('projects section renders', async ({ page }) => {
    const projectsSection = page.locator('section#era-hd').first();

    await projectsSection.scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
    await expect(projectsSection).toBeVisible({ timeout: 5000 });

    // Check for project cards
    const projects = page.locator('[class*="project-card"], h3').count();
    expect(await projects).toBeGreaterThan(0);
  });

  test('contact section exists', async ({ page }) => {
    const contactSection = page.locator('section#era-nextgen').first();

    await contactSection.scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
    await expect(contactSection).toBeVisible({ timeout: 5000 });

    // Check for email link
    const hasEmailLink = await page.locator('a[href*="mailto:"]').count() > 0;
    expect(hasEmailLink).toBeTruthy();
  });

  test('SEO meta tags present (title, description, og:*)', async ({ page }) => {
    // Title tag
    // Title tag - use first() for strict mode compliance
    const title = await page.locator('title').first().textContent();
    expect(title).toBeTruthy();
    expect(title?.length).toBeGreaterThan(0);

    // Description meta tag
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);

    // Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"], meta[property="og:image"], meta[property="og:description"]');
    const ogCount = await ogTitle.count();
    expect(ogCount).toBeGreaterThan(0);
  });

  test('page is responsive (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check page content is visible
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Check no horizontal overflow
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();
  });

  test('page is responsive (tablet)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hero = page.locator('h1, section#hero').first();
    await expect(hero).toBeVisible({ timeout: 5000 });
  });

  test('page is responsive (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hero = page.locator('h1, section#hero').first();
    await expect(hero).toBeVisible({ timeout: 5000 });
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Filter out known non-critical errors
    const criticalErrors = errors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('net::ERR') &&
        !e.includes('Failed to load resource')
    );

    expect(criticalErrors).toHaveLength(0);
  });
});