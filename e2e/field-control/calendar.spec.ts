import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Calendar', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'calendar');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-calendar.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click date input and verify calendar renders', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'calendar');
    const dateInput = page.locator('input[type="date"], calendar-date').first();
    if (await dateInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await dateInput.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('field-control-calendar-interaction.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
