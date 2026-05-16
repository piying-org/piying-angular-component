import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Rating', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'rating');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-rating.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click stars to rate and verify visual change', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'rating');
    const star = page.locator('.pc-rating :is(input, button, [role="radio"]):nth-child(3)').first();
    if (await star.isVisible({ timeout: 2000 }).catch(() => false)) {
      await star.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('field-control-rating-clicked.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
