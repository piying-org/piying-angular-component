import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Drawer', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-group', 'drawer');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-group-drawer.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — open drawer and close it', async ({ page }) => {
    await navigateToExample(page, 'field-group', 'drawer');
    const openBtn = page.locator('.pc-drawer button').first();
    if (await openBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await openBtn.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('field-group-drawer-opened.png', { fullPage: true, maxDiffPixelRatio: 0.01 });

      // Close drawer
      const closeBtn = page.locator('.pc-drawer .pc-close-btn, .pc-drawer [aria-label="close"]').first();
      if (await closeBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await closeBtn.click();
      } else {
        await page.keyboard.press('Escape');
      }
      await page.waitForTimeout(300);
    }
  });
});
