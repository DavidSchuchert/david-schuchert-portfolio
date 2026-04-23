import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'safari-mobile',
      use: { ...devices['iPhone 12'] },
    },
    // Tablet
    {
      name: 'chromium-tablet',
      use: { ...devices['iPad (gen 7)'] },
    },
  ],
  webServer: {
    command: 'export PATH="/opt/homebrew/bin:$PATH" && npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
  timeout: 30 * 1000,
});
