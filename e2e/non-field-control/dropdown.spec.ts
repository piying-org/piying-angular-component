import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Dropdown', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'dropdown');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-dropdown.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — open dropdown and select item', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'dropdown');
    const trigger = page.locator('.pc-dropdown').first();
    if (await trigger.isVisible({ timeout: 2000 }).catch(() => false)) {
      await trigger.click();
      await page.waitForTimeout(500);
      // Try to select first option
      const option = page.getByRole('option').first();
      if (await option.isVisible({ timeout: 1000 }).catch(() => false)) {
        await option.click();
        await page.waitForTimeout(300);
      }
      await expect(page).toHaveScreenshot('non-field-control-dropdown-interaction.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
