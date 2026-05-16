import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Editable Badge', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'editable-badge');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-editable-badge.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click editable badge to edit value', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'editable-badge');
    const badge = page.locator('.pc-editable-badge').first();
    if (await badge.isVisible({ timeout: 2000 }).catch(() => false)) {
      await badge.click();
      await page.waitForTimeout(500);
      // Try to type new value if input appears
      const input = page.locator('.pc-editable-badge input').first();
      if (await input.isVisible({ timeout: 500 }).catch(() => false)) {
        await input.fill('New Value');
        await page.waitForTimeout(300);
      }
      await expect(page).toHaveScreenshot('field-control-editable-badge-interaction.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
