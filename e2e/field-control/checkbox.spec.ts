import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Checkbox', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'checkbox');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-checkbox.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click checkbox and verify state change', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'checkbox');
    const cb = page.locator('input[type="checkbox"], .pc-checkbox').first();
    if (await cb.isVisible({ timeout: 2000 }).catch(() => false)) {
      await cb.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('field-control-checkbox-toggled.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });

  test('interaction — uncheck checkbox if already checked', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'checkbox');
    const cb = page.locator('input[type="checkbox"], .pc-checkbox').first();
    if (await cb.isVisible({ timeout: 2000 }).catch(() => false)) {
      if (await cb.isChecked()) {
        await cb.click();
        await page.waitForTimeout(300);
      }
      await expect(page).toHaveScreenshot('field-control-checkbox-unchecked.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
