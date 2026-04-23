import { test as base, Page, BrowserContext, Locator, ViewportSize } from '@playwright/test';

// ─── Page Fixtures ─────────────────────────────────────────────────────────────

/** Navigate to homepage and wait for it to be ready */
export async function gotoHomepage(page: Page): Promise<void> {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
}

/** Scroll smoothly to a section by id */
export async function scrollToSection(page: Page, sectionId: string): Promise<void> {
  await page.evaluate((id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  }, sectionId);
  await page.waitForTimeout(600);
}

/** Get all section IDs on the page */
export async function getSectionIds(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    return Array.from(document.querySelectorAll('section[id]')).map((el) => `#${el.id}`);
  });
}

// ─── Component Locators ────────────────────────────────────────────────────────

/** Hero section helpers */
export const heroLocators = {
  heading: (page: Page) => page.locator('h1'),
  tagline: (page: Page) => page.locator('p.pixel-font.text-gray-300'),
  ctaButton: (page: Page) => page.locator('a[href*="#era-16bit"]').first(),
  githubLink: (page: Page) => page.locator('a[href*="github.com/DavidSchuchert"]').first(),
  linkedinLink: (page: Page) => page.locator('a[href*="linkedin.com"]').first(),
  xingLink: (page: Page) => page.locator('a[href*="xing.com"]').first(),
  scrollIndicator: (page: Page) => page.locator('a[href*="#era-16bit"]').first(),
};

/** About section helpers */
export const aboutLocators = {
  section: (page: Page) => page.locator('section.smw-map'),
  heading: (page: Page) => page.locator('section.smw-map h2'),
};

/** Skills section helpers */
export const skillsLocators = {
  section: (page: Page) => page.locator('section#era-32bit, section.smash-skills'),
  heading: (page: Page) => page.locator('h2:has-text("CHOOSE YOUR CHARACTER"), h2:has-text("Skills")'),
  skillChips: (page: Page) => page.locator('[data-skill], [class*="chip"], [class*="tag"]'),
};

/** Projects section helpers */
export const projectsLocators = {
  section: (page: Page) => page.locator('section#era-hd'),
  heading: (page: Page) => page.locator('section#era-hd h2'),
  projectCards: (page: Page) => page.locator('section#era-hd article, section#era-hd a[href*="github"], section#era-hd [class*="card"]'),
};

/** YouTube section helpers */
export const youtubeLocators = {
  section: (page: Page) => page.locator('section#era-32bit'), // YouTube is in Skills/Gameboy section now
  heading: (page: Page) => page.locator('h3:has-text("YouTube"), h2:has-text("YouTube")'),
  youtubeEmbed: (page: Page) => page.locator('iframe, [class*="youtube"]'),
};

/** Contact section helpers */
export const contactLocators = {
  section: (page: Page) => page.locator('section#era-nextgen'),
  heading: (page: Page) => page.locator('section#era-nextgen h2'),
  form: (page: Page) => page.locator('section#era-nextgen form'),
  nameInput: (page: Page) => page.locator('input[name="name"], input#name'),
  emailInput: (page: Page) => page.locator('input[name="email"], input#email'),
  messageInput: (page: Page) => page.locator('textarea[name="message"], textarea#message'),
  submitButton: (page: Page) => page.locator('button[type="submit"], a[href*="mailto"]'),
};

/** Footer helpers */
export const footerLocators = {
  footer: (page: Page) => page.locator('footer'),
  socialLinks: (page: Page) => page.locator('footer a[target="_blank"]'),
  navLinks: (page: Page) => page.locator('footer nav a'),
  copyright: (page: Page) => page.locator('footer p'),
};

// ─── Theme Helpers ─────────────────────────────────────────────────────────────

/** Get current theme ('light' or 'dark') */
export async function getCurrentTheme(page: Page): Promise<'light' | 'dark'> {
  const classList = await page.locator('html').getAttribute('class');
  if (classList?.includes('dark')) return 'dark';
  return 'light';
}

/** Toggle dark mode */
export async function toggleDarkMode(page: Page): Promise<void> {
  await page.locator('#theme-toggle').click();
  await page.waitForTimeout(400);
}

/** Check localStorage theme persist */
export async function getStoredTheme(context: BrowserContext): Promise<string | null> {
  const storage = await context.newPage();
  await storage.evaluate(() => localStorage.getItem('theme'));
  const theme = await storage.evaluate(() => localStorage.getItem('theme'));
  await storage.close();
  return theme;
}

// ─── Mobile Helpers ────────────────────────────────────────────────────────────

export const MOBILE_VIEWPORT: ViewportSize = { width: 375, height: 667 };
export const TABLET_VIEWPORT: ViewportSize = { width: 768, height: 1024 };
export const DESKTOP_VIEWPORT: ViewportSize = { width: 1920, height: 1080 };

/** Open mobile menu */
export async function openMobileMenu(page: Page): Promise<void> {
  const btn = page.locator('#mobile-menu-btn');
  const isOpen = await btn.getAttribute('aria-expanded');
  if (isOpen !== 'true') {
    await btn.click();
    await page.waitForTimeout(400);
  }
}

/** Close mobile menu */
export async function closeMobileMenu(page: Page): Promise<void> {
  const btn = page.locator('#mobile-menu-btn');
  const isOpen = await btn.getAttribute('aria-expanded');
  if (isOpen === 'true') {
    await btn.click();
    await page.waitForTimeout(400);
  }
}

// ─── SEO Helpers ───────────────────────────────────────────────────────────────

export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  robots: string;
}

export async function getSEOMeta(page: Page): Promise<SEOData> {
  const getMetaContent = async (selector: string): Promise<string> => {
    return page.locator(selector).getAttribute('content') as string;
  };
  const getMetaName = async (selector: string): Promise<string> => {
    return page.locator(selector).getAttribute('name') as string;
  };

  return {
    title: await page.locator('title').textContent() as string,
    description: await getMetaContent('meta[name="description"]'),
    canonical: await getMetaContent('link[rel="canonical"]'),
    ogTitle: await getMetaContent('meta[property="og:title"]'),
    ogDescription: await getMetaContent('meta[property="og:description"]'),
    ogImage: await getMetaContent('meta[property="og:image"]'),
    twitterCard: await getMetaName('meta[name="twitter:card"]'),
    robots: await getMetaContent('meta[name="robots"]'),
  };
}

// ─── External Link Checker ──────────────────────────────────────────────────────

export interface LinkHealthResult {
  url: string;
  ok: boolean;
  status: number;
}

export async function checkLinkHealth(page: Page, url: string): Promise<LinkHealthResult> {
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
    return {
      url,
      ok: response?.ok() ?? false,
      status: response?.status() ?? 0,
    };
  } catch {
    return { url, ok: false, status: 0 };
  }
}
