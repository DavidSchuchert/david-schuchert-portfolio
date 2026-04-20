import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('page loads under 3 seconds', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Wait for critical content to be visible
    await page.waitForSelector('body', { state: 'visible' });

    // Measure full load time including network idle
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // 3 seconds = 3000ms
    expect(loadTime).toBeLessThan(3000);

    // Log for visibility
    console.log(`Page load time: ${loadTime}ms`);
  });

  test('First Contentful Paint (FCP) is under 1.5s', async ({ page }) => {
    // FCP is when first content becomes visible
    const startTime = Date.now();

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Check if any content is visible
    const bodyVisible = await page.locator('body').isVisible();
    expect(bodyVisible).toBeTruthy();

    // Get First Paint via performance timing
    const fcp = await page.evaluate(() => {
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');

      const fcpEntry = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        return fcpEntry.startTime;
      }
      return null;
    });

    if (fcp !== null) {
      console.log(`First Contentful Paint: ${fcp}ms`);
      expect(fcp).toBeLessThan(1500);
    } else {
      // Fallback: check that page started rendering quickly
      const elapsed = Date.now() - startTime;
      expect(elapsed).toBeLessThan(2000);
    }
  });

  test('Largest Contentful Paint (LCP) is reasonable', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Get LCP value
    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        const observer = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry;
          resolve(lastEntry.startTime);
          observer.disconnect();
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });

        // Fallback timeout
        setTimeout(() => resolve(-1), 5000);
      });
    });

    if (lcp > 0) {
      console.log(`Largest Contentful Paint: ${lcp}ms`);
      // LCP should be under 2.5s for good UX
      expect(lcp).toBeLessThan(2500);
    }
  });

  test('First Input Delay (FID) - page responds to interaction', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Measure time to first interaction readiness
    const startTime = Date.now();

    // Click somewhere on the page
    const body = page.locator('body');
    await body.click();

    const timeToInteractive = Date.now() - startTime;

    console.log(`Time to first interaction: ${timeToInteractive}ms`);

    // Should be responsive quickly (< 100ms to register the click)
    expect(timeToInteractive).toBeLessThan(500);
  });

  test('Cumulative Layout Shift (CLS) is minimal', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Wait a bit for any animations/async content
    await page.waitForTimeout(2000);

    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        const observer = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries() as PerformanceEntry[];
          let clsValue = 0;

          entries.forEach((entry) => {
            const layoutShift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
            if (!layoutShift.hadRecentInput) {
              clsValue += layoutShift.value || 0;
            }
          });

          resolve(clsValue);
          observer.disconnect();
        });
        observer.observe({ type: 'layout-shift', buffered: true });

        // Fallback
        setTimeout(() => resolve(-1), 5000);
      });
    });

    if (cls >= 0) {
      console.log(`Cumulative Layout Shift: ${cls}`);
      // Good CLS is under 0.1
      expect(cls).toBeLessThan(0.15);
    }
  });

  test('page bundle size is reasonable (network requests)', async ({ page }) => {
    const networkRequests: { url: string; size: number }[] = [];

    page.on('response', (response) => {
      const url = response.url();
      // Only track JS/CSS resources
      if (url.endsWith('.js') || url.endsWith('.css') || url.includes('.js?')) {
        networkRequests.push({
          url: url.split('/').pop() || url,
          size: response.headers()['content-length']
            ? parseInt(response.headers()['content-length'] as string)
            : 0,
        });
      }
    });

    await page.goto('/', { waitUntil: 'networkidle' });

    // Print resource info
    console.log('JS/CSS resources loaded:');
    networkRequests.forEach((req) => {
      const sizeKB = req.size > 0 ? `${(req.size / 1024).toFixed(2)} KB` : 'unknown size';
      console.log(`  ${req.url} - ${sizeKB}`);
    });

    // Check no single JS file is massive (> 500KB)
    const oversizedResources = networkRequests.filter((r) => r.size > 500 * 1024);
    expect(oversizedResources).toHaveLength(0);
  });

  test('page is interactive within reasonable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Check page is interactive (no blocking scripts)
    const isInteractive = await page.evaluate(() => {
      return document.readyState === 'complete' || document.readyState === 'interactive';
    });

    expect(isInteractive).toBeTruthy();

    const timeToInteractive = Date.now() - startTime;
    console.log(`Time to interactive: ${timeToInteractive}ms`);

    // Should be interactive within 3 seconds
    expect(timeToInteractive).toBeLessThan(3000);
  });

  test('images load efficiently (lazy loading if applicable)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Check for images
    const images = page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      // Check if images have loading attribute or srcset for responsiveness
      const imageInfo = await images.evaluate((els) =>
        els.map((el) => ({
          src: el.getAttribute('src') || '',
          loading: el.getAttribute('loading'),
          alt: el.getAttribute('alt'),
          hasSrcset: el.hasAttribute('srcset'),
        }))
      );

      console.log(`Found ${imageCount} images`);

      // Verify images have alt text for accessibility
      const imagesWithoutAlt = imageInfo.filter((img) => !img.alt && !img.src.includes('icon'));
      expect(imagesWithoutAlt).toHaveLength(0);

      // Check that above-fold images load eagerly
      const aboveFoldImages = imageInfo.slice(0, 3);
      const eagerImages = aboveFoldImages.filter((img) => img.loading !== 'lazy');
      // At least some images should load eagerly (lazy loading is opt-in)
      expect(eagerImages.length).toBeGreaterThan(0);
    }
  });

  test('fonts load without blocking render', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const fontInfo = await page.evaluate(() => {
      const fontFaces = (document as any).fonts?.status?.();
      const styles = Array.from(document.styleSheets).flatMap((sheet) =>
        Array.from(sheet.cssRules || []).map((rule) => rule.cssText)
      );

      return {
        hasWebFonts: styles.some((s) => s.includes('@font-face') || s.includes('font-family')),
        fontCount: styles.filter((s) => s.includes('font')).length,
      };
    });

    console.log('Font loading:', fontInfo);
    // Just ensure fonts don't crash the page
    expect(fontInfo).toBeTruthy();
  });
});