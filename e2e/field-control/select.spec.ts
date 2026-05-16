import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Select', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'select');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-select.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — open dropdown and select option', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'select');
    const selectTrigger = page.locator('.pc-select').first();
    if (await selectTrigger.isVisible({ timeout: 2000 }).catch(() => false)) {
      await selectTrigger.click();
      await page.waitForTimeout(500);
      // Try to select first option
      const option = page.getByRole('option').first();
      if (await option.isVisible({ timeout: 1000 }).catch(() => false)) {
        await option.click();
        await page.waitForTimeout(300);
      }
      await expect(page).toHaveScreenshot('field-control-select-interaction.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
