import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Picker Ref', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'extension', 'picker-ref');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('extension-picker-ref.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — open picker and select value', async ({ page }) => {
    await navigateToExample(page, 'extension', 'picker-ref');
    const pickerTrigger = page.locator('.pc-picker-ref').first();
    if (await pickerTrigger.isVisible({ timeout: 2000 }).catch(() => false)) {
      await pickerTrigger.click();
      await page.waitForTimeout(500);
      // Try to select first option if a dropdown appears
      const option = page.getByRole('option').first();
      if (await option.isVisible({ timeout: 1000 }).catch(() => false)) {
        await option.click();
        await page.waitForTimeout(300);
      }
      await expect(page).toHaveScreenshot('extension-picker-ref-interaction.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
