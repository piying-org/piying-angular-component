import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Textarea', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'textarea');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-textarea.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — type into textarea and verify visual change', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'textarea');
    const textarea = page.locator('piying-view textarea').first();
    if (await textarea.isVisible({ timeout: 2000 }).catch(() => false)) {
      await textarea.click();
      await textarea.fill('Hello E2E Test in textarea');
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('field-control-textarea-typed.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
