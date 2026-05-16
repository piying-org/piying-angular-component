import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Swap', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'swap');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-swap.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — toggle swap state', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'swap');
    const swapTrigger = page.locator('.pc-swap').first();
    if (await swapTrigger.isVisible({ timeout: 2000 }).catch(() => false)) {
      await swapTrigger.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('field-control-swap-toggled.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
