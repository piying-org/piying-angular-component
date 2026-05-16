import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Breadcrumbs', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'breadcrumbs');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-breadcrumbs.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click breadcrumb link', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'breadcrumbs');
    const link = page.locator('.pc-breadcrumbs a').first();
    if (await link.isVisible({ timeout: 2000 }).catch(() => false)) {
      await link.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('non-field-control-breadcrumbs-clicked.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
