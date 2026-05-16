import { Page } from '@playwright/test';

/**
 * Dual screenshot helper:
 * 1. toHaveScreenshot for visual regression comparison
 * 2. page.screenshot for standalone visual reference library
 */
export async function captureScreenshot(
  page: Page,
  examplePath: string,
  options?: { fullPage?: boolean },
): Promise<void> {
  const fullPage = options?.fullPage !== false;

  // Normalize path to filename-safe string (e.g., "field-control/button" → "field-control-button")
  const safeName = examplePath.replace(/[/\\]/g, '-');

  // 1. Visual regression screenshot (compared against baseline)
  await expect(page).toHaveScreenshot(`${safeName}.png`, {
    fullPage,
    maxDiffPixelRatio: 0.01,
  });

  // 2. Standalone screenshot for visual reference library
  const fs = require('fs');
  const path = require('path');
  const screenshotDir = path.join(process.cwd(), 'e2e', 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  await page.screenshot({
    path: path.join(screenshotDir, `${safeName}.png`),
    fullPage,
  });
}

/**
 * Take a standalone full page screenshot without regression comparison.
 */
export async function screenshotFullPage(
  page: Page,
  fileName: string,
): Promise<void> {
  const fs = require('fs');
  const path = require('path');
  const screenshotDir = path.join(process.cwd(), 'e2e', 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  await page.screenshot({
    path: path.join(screenshotDir, fileName),
    fullPage: true,
  });
}
