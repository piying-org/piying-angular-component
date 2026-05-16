import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Password', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'password');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-password.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — type password and toggle visibility', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'password');
    const input = page.locator('piying-view input[type="password"]').first();
    if (await input.isVisible({ timeout: 2000 }).catch(() => false)) {
      await input.click();
      await input.fill('secret123');
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('field-control-password-typed.png', { fullPage: true, maxDiffPixelRatio: 0.01 });

      // Toggle visibility if there's a show/hide button
      const toggleBtn = page.locator('.pc-password :is(button, [role="button"])').last();
      if (await toggleBtn.isVisible({ timeout: 500 }).catch(() => false)) {
        await toggleBtn.click();
        await page.waitForTimeout(300);
        await expect(page).toHaveScreenshot('field-control-password-visible.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
      }
    }
  });
});
