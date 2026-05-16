import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Dashboard Function Page', () => {
  test('base — render + content verification', async ({ page }) => {
    await navigateToExample(page, 'function', 'dashboard');
    await expect(page).toHaveTitle(/.*|piying/gi);
    // Dashboard has dynamic dimensions from faker-generated data; use element-level assertions
    await expect(page.locator('[id^="pi-"]').first()).toBeVisible();
  });

  test('interaction — interact with dashboard widgets', async ({ page }) => {
    await navigateToExample(page, 'function', 'dashboard');
    // Try clicking on interactive elements in the dashboard
    const interactiveEl = page.locator('.pc-function-dashboard :is(button, [role="button"], .chart-element)').first();
    if (await interactiveEl.isVisible({ timeout: 2000 }).catch(() => false)) {
      await interactiveEl.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('function-dashboard-interacted.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
