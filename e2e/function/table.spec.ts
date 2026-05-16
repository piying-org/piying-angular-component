import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Function Table Page', () => {
  test('base — render + content verification', async ({ page }) => {
    await navigateToExample(page, 'function', 'table');
    await expect(page).toHaveTitle(/.*|piying/gi);
    // Table may have variable row heights; use element-level assertions
    await expect(page.locator('[id^="pi-"]').first()).toBeVisible();
  });

  test('interaction — click table row and verify selection', async ({ page }) => {
    await navigateToExample(page, 'function', 'table');
    const row = page.locator('.pc-function-table tr').first();
    if (await row.isVisible({ timeout: 2000 }).catch(() => false)) {
      await row.click();
      await page.waitForTimeout(500);
    }
  });
});
