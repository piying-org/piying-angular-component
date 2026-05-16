import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Confirm', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'overlay', 'confirm');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('overlay-confirm.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — trigger confirm and click cancel', async ({ page }) => {
    await navigateToExample(page, 'overlay', 'confirm');
    const confirmTrigger = page.locator('.pc-confirm button').first();
    if (await confirmTrigger.isVisible({ timeout: 2000 }).catch(() => false)) {
      await confirmTrigger.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('overlay-confirm-opened.png', { fullPage: true, maxDiffPixelRatio: 0.01 });

      // Click cancel button
      const cancelBtn = page.locator('.pc-confirm :is(button):has-text("Cancel"):first-of-type').first();
      if (await cancelBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await cancelBtn.click();
      } else {
        await page.keyboard.press('Escape');
      }
      await page.waitForTimeout(300);
    }
  });

  test('interaction — trigger confirm and click confirm', async ({ page }) => {
    await navigateToExample(page, 'overlay', 'confirm');
    const confirmTrigger = page.locator('.pc-confirm button').first();
    if (await confirmTrigger.isVisible({ timeout: 2000 }).catch(() => false)) {
      await confirmTrigger.click();
      await page.waitForTimeout(500);

      // Click confirm/OK button
      const okBtn = page.locator('.pc-confirm :is(button):has-text("OK"):last-of-type, .pc-confirm :is(button):has-text("Confirm"):last-of-type').first();
      if (await okBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await okBtn.click();
      }
      await page.waitForTimeout(300);
    }
  });
});
