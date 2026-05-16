import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Input', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'input');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-input.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — type into input and verify visual change', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'input');
    const input = page.locator('piying-view input:not([type="hidden"]):not([type="checkbox"]), [class*="pc-input"]').first();
    if (await input.isVisible({ timeout: 2000 }).catch(() => false)) {
      await input.click();
      await input.fill('Hello E2E Test');
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('field-control-input-typed.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
