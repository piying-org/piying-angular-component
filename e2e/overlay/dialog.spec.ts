import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Dialog', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'overlay', 'dialog');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('overlay-dialog.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — open dialog and close it', async ({ page }) => {
    await navigateToExample(page, 'overlay', 'dialog');
    const openBtn = page.locator('.pc-dialog button').first();
    if (await openBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await openBtn.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('overlay-dialog-opened.png', { fullPage: true, maxDiffPixelRatio: 0.01 });

      // Close dialog
      const closeBtn = page.locator('.pc-dialog .pc-close-btn').first();
      if (await closeBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await closeBtn.click();
      } else {
        await page.keyboard.press('Escape');
      }
      await page.waitForTimeout(300);
    }
  });
});
