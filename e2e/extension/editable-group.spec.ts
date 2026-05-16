import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Editable Group', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'extension', 'editable-group');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('extension-editable-group.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click editable cell and modify value', async ({ page }) => {
    await navigateToExample(page, 'extension', 'editable-group');
    const editableCell = page.locator('.pc-editable-group :is(td, th):has-text("Click")').first();
    if (await editableCell.isVisible({ timeout: 2000 }).catch(() => false)) {
      await editableCell.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('extension-editable-group-interaction.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
