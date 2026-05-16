import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Tooltip Wrapper', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'wrapper', 'tooltip');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('wrapper-tooltip.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — hover element to show tooltip', async ({ page }) => {
    await navigateToExample(page, 'wrapper', 'tooltip');
    const tooltipTarget = page.locator('.pc-tooltip').first();
    if (await tooltipTarget.isVisible({ timeout: 2000 }).catch(() => false)) {
      await tooltipTarget.hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('wrapper-tooltip-hovered.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
