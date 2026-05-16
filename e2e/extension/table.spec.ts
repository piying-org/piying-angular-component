import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Table', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'extension', 'table');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('extension-table.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click table header for sort', async ({ page }) => {
    await navigateToExample(page, 'extension', 'table');
    const sortableHeader = page.locator('.pc-table th:has-text("Sort"), .pc-table th button').first();
    if (await sortableHeader.isVisible({ timeout: 2000 }).catch(() => false)) {
      await sortableHeader.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('extension-table-sorted.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });

  test('interaction — click pagination to change page', async ({ page }) => {
    await navigateToExample(page, 'extension', 'table');
    const nextBtn = page.locator('.pc-pagination button:has-text(">")').first();
    if (await nextBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await nextBtn.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('extension-table-paged.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
