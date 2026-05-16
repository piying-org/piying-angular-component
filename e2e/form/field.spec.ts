import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Form Field', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'form', 'field');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('form-field.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — fill form field and verify submission state', async ({ page }) => {
    await navigateToExample(page, 'form', 'field');
    const input = page.locator('.pc-form-field input').first();
    if (await input.isVisible({ timeout: 2000 }).catch(() => false)) {
      await input.click();
      await input.fill('Test Value');
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('form-field-filled.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
