import { test, expect, Page } from '@playwright/test';
import {
  heroLocators,
  aboutLocators,
  skillsLocators,
  projectsLocators,
  youtubeLocators,
  contactLocators,
  footerLocators,
} from '../helpers';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('renders heading with tagline', async ({ page }) => {
    const heading = heroLocators.heading(page);
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text).toBeTruthy();
  });

  test('shows Code. Kurse. Controller. tagline', async ({ page }) => {
    const tagline = heroLocators.tagline(page);
    await expect(tagline).toBeVisible();
  });

  test('CTA button links to #projects', async ({ page }) => {
    const cta = heroLocators.ctaButton(page);
    await expect(cta).toBeVisible();
    const href = await cta.getAttribute('href');
    expect(href).toContain('#projects');
  });

  test('GitHub social link is visible', async ({ page }) => {
    const link = heroLocators.githubLink(page);
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toContain('github.com/davidschuchert');
  });

  test('LinkedIn social link is visible', async ({ page }) => {
    const link = heroLocators.linkedinLink(page);
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toContain('linkedin.com');
  });

  test('Xing social link is visible', async ({ page }) => {
    const link = heroLocators.xingLink(page);
    await expect(link).toBeVisible();
  });

  test('scroll indicator links to #about', async ({ page }) => {
    const indicator = heroLocators.scrollIndicator(page);
    await expect(indicator).toBeVisible();
    const href = await indicator.getAttribute('href');
    expect(href).toContain('#about');
  });

  test('typing animation element exists', async ({ page }) => {
    // The role-text span should exist (typing animation target)
    const roleText = page.locator('#role-text');
    await expect(roleText).toBeAttached();
  });

  test('hero ASCII art decoration renders', async ({ page }) => {
    const ascii = page.locator('.ascii-box');
    await expect(ascii).toBeVisible();
  });

  test('gradient background orbs exist', async ({ page }) => {
    const orbs = page.locator('.blur-3xl');
    expect(await orbs.count()).toBeGreaterThan(0);
  });
});

test.describe('About Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('section exists and is visible', async ({ page }) => {
    const section = aboutLocators.section(page);
    await expect(section).toBeVisible();
  });

  test('section has an h2 heading', async ({ page }) => {
    const heading = aboutLocators.heading(page);
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  });

  test('section has a scroll target id', async ({ page }) => {
    const section = aboutLocators.section(page);
    const id = await section.getAttribute('id');
    expect(id).toBe('about');
  });

  test('section contains text content', async ({ page }) => {
    const section = aboutLocators.section(page);
    const text = await section.textContent();
    expect(text?.trim().length).toBeGreaterThan(10);
  });

  test('scrolls into view without crash', async ({ page }) => {
    const section = aboutLocators.section(page);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  });
});

test.describe('Skills Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('section exists and is visible', async ({ page }) => {
    const section = skillsLocators.section(page);
    await expect(section).toBeVisible();
  });

  test('section has an h2 heading', async ({ page }) => {
    const heading = skillsLocators.heading(page);
    await expect(heading).toBeVisible();
  });

  test('section has id=skills', async ({ page }) => {
    const section = skillsLocators.section(page);
    const id = await section.getAttribute('id');
    expect(id).toBe('skills');
  });

  test('contains recognizable skill names', async ({ page }) => {
    const section = skillsLocators.section(page);
    const text = await section.textContent();
    // Check for at least some expected skills
    const hasSkills = /JavaScript|TypeScript|Python|React|Laravel|Angular/i.test(text || '');
    expect(hasSkills).toBeTruthy();
  });

  test('scrolls into view without crash', async ({ page }) => {
    const section = skillsLocators.section(page);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  });
});

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('section exists and is visible', async ({ page }) => {
    const section = projectsLocators.section(page);
    await expect(section).toBeVisible();
  });

  test('section has an h2 heading', async ({ page }) => {
    const heading = projectsLocators.heading(page);
    await expect(heading).toBeVisible();
  });

  test('section has id=projects', async ({ page }) => {
    const section = projectsLocators.section(page);
    const id = await section.getAttribute('id');
    expect(id).toBe('projects');
  });

  test('contains project cards or links', async ({ page }) => {
    const cards = projectsLocators.projectCards(page);
    const count = await cards.count();
    // Site may have 0-N projects, just ensure section renders and has content
    const section = projectsLocators.section(page);
    const text = await section.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
    // If cards exist, they should be in the section
    if (count > 0) {
      await expect(cards.first()).toBeVisible();
    }
  });

  test('scrolls into view without crash', async ({ page }) => {
    const section = projectsLocators.section(page);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  });
});

test.describe('YouTube Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('section exists and is visible', async ({ page }) => {
    const section = youtubeLocators.section(page);
    await expect(section).toBeVisible();
  });

  test('section has an h2 heading', async ({ page }) => {
    const heading = youtubeLocators.heading(page);
    await expect(heading).toBeVisible();
  });

  test('section has id=youtube', async ({ page }) => {
    const section = youtubeLocators.section(page);
    const id = await section.getAttribute('id');
    expect(id).toBe('youtube');
  });

  test('contains iframe embed or YouTube link', async ({ page }) => {
    const embed = youtubeLocators.youtubeEmbed(page);
    const count = await embed.count();
    const section = youtubeLocators.section(page);
    const text = await section.textContent();
    // Either an iframe or a link to YouTube channel
    const hasContent = count > 0 || (text && /youtube|youtu.be/i.test(text));
    expect(hasContent).toBeTruthy();
  });

  test('scrolls into view without crash', async ({ page }) => {
    const section = youtubeLocators.section(page);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  });
});

test.describe('Contact Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('section exists and is visible', async ({ page }) => {
    const section = contactLocators.section(page);
    await expect(section).toBeVisible();
  });

  test('section has an h2 heading', async ({ page }) => {
    const heading = contactLocators.heading(page);
    await expect(heading).toBeVisible();
  });

  test('section has id=contact', async ({ page }) => {
    const section = contactLocators.section(page);
    const id = await section.getAttribute('id');
    expect(id).toBe('contact');
  });

  test('form inputs exist', async ({ page }) => {
    const nameInput = contactLocators.nameInput(page);
    const emailInput = contactLocators.emailInput(page);
    const messageInput = contactLocators.messageInput(page);

    // At minimum, some form fields should exist
    const nameCount = await nameInput.count();
    const emailCount = await emailInput.count();
    expect(nameCount + emailCount).toBeGreaterThan(0);
  });

  test('submit button exists', async ({ page }) => {
    const btn = contactLocators.submitButton(page);
    const section = contactLocators.section(page);
    // Either a submit button or a button inside the section
    const btnInSection = section.locator('button');
    const count = await btnInSection.count();
    expect(count).toBeGreaterThan(0);
  });

  test('scrolls into view without crash', async ({ page }) => {
    const section = contactLocators.section(page);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  });
});

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('footer is visible', async ({ page }) => {
    const footer = footerLocators.footer(page);
    await expect(footer).toBeVisible();
  });

  test('contains social links with target=_blank', async ({ page }) => {
    const socialLinks = footerLocators.socialLinks(page);
    const count = await socialLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('contains navigation links', async ({ page }) => {
    const navLinks = footerLocators.navLinks(page);
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('contains copyright text with current year', async ({ page }) => {
    const copyright = footerLocators.copyright(page);
    await expect(copyright.first()).toBeVisible();
    const text = await copyright.first().textContent();
    const year = new Date().getFullYear().toString();
    expect(text).toContain(year);
  });

  test('DBE-Academy link is present', async ({ page }) => {
    const dbeLink = page.locator('a[href*="dbe.academy"]');
    await expect(dbeLink.first()).toBeVisible();
  });
});
