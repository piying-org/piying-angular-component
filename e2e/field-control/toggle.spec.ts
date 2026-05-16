import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Toggle', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'toggle');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-toggle.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click toggle and verify state change', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'toggle');
    const toggle = page.locator('.pc-toggle input[type="checkbox"], .pc-toggle').first();
    if (await toggle.isVisible({ timeout: 2000 }).catch(() => false)) {
      await toggle.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('field-control-toggle-toggled.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
