import { test as base, Page, BrowserContext } from '@playwright/test';

export interface TestFixtures {
  baseURL: string;
}

export const test = base.extend<TestFixtures>({
  baseURL: async ({}, use) => {
    await use('http://localhost:4321');
  },
});

export { expect } from '@playwright/test';

// Helper functions for tests
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
}

export async function getThemePreference(context: BrowserContext): Promise<string> {
  const cookies = await context.cookies();
  const themeCookie = cookies.find((c) => c.name === 'theme');
  return themeCookie?.value || 'light';
}