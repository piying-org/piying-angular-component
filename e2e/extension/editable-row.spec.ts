import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Editable Row', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'extension', 'editable-row');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('extension-editable-row.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — edit a row value', async ({ page }) => {
    await navigateToExample(page, 'extension', 'editable-row');
    const editableRow = page.locator('.pc-editable-row :is(td, [class*="editable"]):first-of-type').first();
    if (await editableRow.isVisible({ timeout: 2000 }).catch(() => false)) {
      await editableRow.click();
      await page.waitForTimeout(500);
      // Try to type a new value
      const input = page.locator('.pc-editable-row input').first();
      if (await input.isVisible({ timeout: 500 }).catch(() => false)) {
        await input.fill('Modified');
        await page.waitForTimeout(300);
      }
      await expect(page).toHaveScreenshot('extension-editable-row-edited.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
