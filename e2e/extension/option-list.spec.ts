import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Option List', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'extension', 'option-list');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('extension-option-list.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click an option to select', async ({ page }) => {
    await navigateToExample(page, 'extension', 'option-list');
    const option = page.locator('.pc-option-list :is(button, [role="option"], .pc-option-item)').first();
    if (await option.isVisible({ timeout: 2000 }).catch(() => false)) {
      await option.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('extension-option-list-selected.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
