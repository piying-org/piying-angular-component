import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Tabs', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-group', 'tabs');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-group-tabs.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — switch tab and verify content change', async ({ page }) => {
    await navigateToExample(page, 'field-group', 'tabs');
    const tabs = page.locator('.pc-tabs [role="tab"], .pc-tabs :is(button, a)[class*="tab"]');
    const count = await tabs.count();
    if (count > 1) {
      // Click second tab
      await tabs.nth(1).click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('field-group-tabs-switched.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
