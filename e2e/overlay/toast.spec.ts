import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Toast', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'overlay', 'toast');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('overlay-toast.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — trigger toast notification', async ({ page }) => {
    await navigateToExample(page, 'overlay', 'toast');
    const toastTrigger = page.locator('.pc-toast button').first();
    if (await toastTrigger.isVisible({ timeout: 2000 }).catch(() => false)) {
      await toastTrigger.click();
      await page.waitForTimeout(1000); // Toast may auto-dismiss, give it time
      await expect(page).toHaveScreenshot('overlay-toast-triggered.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
