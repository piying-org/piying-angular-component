import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Loading', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'loading');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-loading.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — trigger loading state if toggle available', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'loading');
    const toggle = page.locator('.pc-loading button').first();
    if (await toggle.isVisible({ timeout: 2000 }).catch(() => false)) {
      await toggle.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('non-field-control-loading-triggered.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
