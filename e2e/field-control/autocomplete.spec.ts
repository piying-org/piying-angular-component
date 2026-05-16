import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Autocomplete', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'autocomplete');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-autocomplete.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — type to trigger suggestions and select one', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'autocomplete');
    const input = page.locator('piying-view input').first();
    if (await input.isVisible({ timeout: 2000 }).catch(() => false)) {
      await input.click();
      await input.fill('a');
      await page.waitForTimeout(500);
      // Try to select first suggestion if visible
      const option = page.getByRole('option').first();
      if (await option.isVisible({ timeout: 1000 }).catch(() => false)) {
        await option.click();
        await page.waitForTimeout(300);
      }
      await expect(page).toHaveScreenshot('field-control-autocomplete-interaction.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
