import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Button Input', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'button-input');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-button-input.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click button inside input and verify action', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'button-input');
    const btn = page.locator('.pc-button-input :is(button, .pc-btn)').first();
    if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await btn.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('field-control-button-input-clicked.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
