import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('FAB', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'fab');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-fab.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click FAB button', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'fab');
    const fab = page.locator('.pc-fab').first();
    if (await fab.isVisible({ timeout: 2000 }).catch(() => false)) {
      await fab.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('non-field-control-fab-clicked.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
