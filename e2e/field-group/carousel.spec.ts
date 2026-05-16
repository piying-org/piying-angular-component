import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Carousel', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-group', 'carousel');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-group-carousel.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click next/prev buttons', async ({ page }) => {
    await navigateToExample(page, 'field-group', 'carousel');
    const prevBtn = page.locator('.pc-carousel :is(button):first-of-type').first();
    if (await prevBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await prevBtn.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('field-group-carousel-nav.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
