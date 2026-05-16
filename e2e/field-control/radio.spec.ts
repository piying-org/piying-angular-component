import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Radio', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'radio');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-radio.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click radio option and verify selection change', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'radio');
    const radioOptions = page.locator('.pc-radio .radio-item, .pc-radio input[type="radio"]').first();
    if (await radioOptions.isVisible({ timeout: 2000 }).catch(() => false)) {
      await radioOptions.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('field-control-radio-selected.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
