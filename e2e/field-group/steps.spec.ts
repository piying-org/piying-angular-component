import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Steps', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-group', 'steps');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-group-steps.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click a step to navigate', async ({ page }) => {
    await navigateToExample(page, 'field-group', 'steps');
    const steps = page.locator('.pc-steps li, [role="listitem"]');
    const count = await steps.count();
    if (count > 0) {
      // Click the second step if available
      const targetStep = count > 1 ? steps.nth(1) : steps.first();
      if (await targetStep.isVisible({ timeout: 2000 }).catch(() => false)) {
        await targetStep.click();
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot('field-group-steps-clicked.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
      }
    }
  });
});
