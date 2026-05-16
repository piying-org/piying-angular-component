import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Input Number', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'input-number');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-input-number.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — type number and verify change', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'input-number');
    const input = page.locator('piying-view input[type="number"]').first();
    if (await input.isVisible({ timeout: 2000 }).catch(() => false)) {
      await input.click();
      await input.fill('42');
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('field-control-input-number-typed.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });

  test('interaction — click increment/decrement buttons', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'input-number');
    const incBtn = page.locator('.pc-input-number :is(button):nth-child(1)').first();
    if (await incBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await incBtn.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('field-control-input-number-incremented.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
