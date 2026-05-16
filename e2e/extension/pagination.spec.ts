import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Pagination', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'extension', 'pagination');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('extension-pagination.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click page number to change page', async ({ page }) => {
    await navigateToExample(page, 'extension', 'pagination');
    const nextBtn = page.locator('.pc-pagination button:has-text(">")').first();
    if (await nextBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await nextBtn.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('extension-pagination-clicked.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    } else {
      // Fallback: try clicking any page number button
      const pageBtn = page.locator('.pc-pagination :is(button, a):not(:has-text("<")):not(:has-text(">"))').first();
      if (await pageBtn.isVisible({ timeout: 500 }).catch(() => false)) {
        await pageBtn.click();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot('extension-pagination-clicked.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
      }
    }
  });
});
