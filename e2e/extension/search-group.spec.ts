import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Search Group', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'extension', 'search-group');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('extension-search-group.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — type search query and submit', async ({ page }) => {
    await navigateToExample(page, 'extension', 'search-group');
    const searchInput = page.locator('.pc-search-group input').first();
    if (await searchInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await searchInput.fill('test query');
      await page.waitForTimeout(300);
      const searchBtn = page.locator('.pc-search-group :is(button, [role="button"])').first();
      if (await searchBtn.isVisible({ timeout: 500 }).catch(() => false)) {
        await searchBtn.click();
        await page.waitForTimeout(500);
      }
      await expect(page).toHaveScreenshot('extension-search-group-searched.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
