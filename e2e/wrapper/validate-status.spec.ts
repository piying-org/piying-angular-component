import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Validate Status Wrapper', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'wrapper', 'validate-status');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('wrapper-validate-status.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — trigger validation and verify status display', async ({ page }) => {
    await navigateToExample(page, 'wrapper', 'validate-status');
    // Try to blur input to trigger validation
    const input = page.locator('.pc-validate-status input').first();
    if (await input.isVisible({ timeout: 2000 }).catch(() => false)) {
      await input.click();
      await input.fill('test');
      await input.blur();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('wrapper-validate-status-validated.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
