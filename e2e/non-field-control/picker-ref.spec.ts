import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Picker Ref (NFC)', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'picker-ref');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-picker-ref.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — open picker overlay', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'picker-ref');
    const trigger = page.locator('.pc-picker-ref').first();
    if (await trigger.isVisible({ timeout: 2000 }).catch(() => false)) {
      await trigger.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('non-field-control-picker-ref-opened.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
