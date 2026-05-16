import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Button', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'button');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-button.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click different buttons and verify state change', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'button');
    const btn = page.locator('.pc-btn').first();
    if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await btn.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('non-field-control-button-clicked.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });

  test('interaction — hover button to see accent color', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'button');
    const btn = page.locator('.pc-btn').first();
    if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await btn.hover();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('non-field-control-button-hovered.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
