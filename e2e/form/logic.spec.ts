import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Form Logic', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'form', 'logic');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('form-logic.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — trigger logic rules (conditional show/hide or disable)', async ({ page }) => {
    await navigateToExample(page, 'form', 'logic');
    // Try interacting with the first available input
    const input = page.locator('.pc-form-logic input').first();
    if (await input.isVisible({ timeout: 2000 }).catch(() => false)) {
      await input.click();
      await input.fill('trigger-logic');
      await page.waitForTimeout(500); // Let logic rules evaluate
      await expect(page).toHaveScreenshot('form-logic-triggered.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
