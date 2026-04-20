# Playwright E2E Tests

End-to-end tests for the David Portfolio site using Playwright.

## Setup

```bash
npm install
npx playwright install chromium
```

## Running Tests

```bash
# Run all tests
npm run test:e2e

# Run with UI (visual debugger)
npm run test:e2e:ui

# Run in debug mode
npm run test:e2e:debug
```

## Test Structure

- `tests/e2e/homepage.spec.ts` - Homepage functionality tests
- `tests/e2e/navigation.spec.ts` - Navigation and menu tests
- `tests/e2e/performance.spec.ts` - Performance and Core Web Vitals tests

## Configuration

See `playwright.config.ts` for test configuration (base URL, timeouts, reporters, etc.)

## Reports

HTML reports are generated in `playwright-report/` after test runs.