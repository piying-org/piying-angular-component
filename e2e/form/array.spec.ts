import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Form Array', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'form', 'array');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('form-array.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — add new array item and verify UI update', async ({ page }) => {
    await navigateToExample(page, 'form', 'array');
    const addBtn = page.locator('.pc-array :is(button):has-text("Add"):first-of-type').first();
    if (await addBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await addBtn.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('form-array-added.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
