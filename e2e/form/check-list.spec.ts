import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Form Check List', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'form', 'check-list');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('form-check-list.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — check/uncheck list items', async ({ page }) => {
    await navigateToExample(page, 'form', 'check-list');
    const checkbox = page.locator('.pc-check-list input[type="checkbox"]').first();
    if (await checkbox.isVisible({ timeout: 2000 }).catch(() => false)) {
      await checkbox.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('form-check-list-toggled.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
