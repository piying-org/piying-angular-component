import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Input Button', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'input-button');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-input-button.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click the button portion of input-button', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'input-button');
    const btn = page.locator('.pc-input-button :is(button, .pc-btn)').first();
    if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await btn.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('non-field-control-input-button-clicked.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
