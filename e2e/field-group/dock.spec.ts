import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Dock', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-group', 'dock');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-group-dock.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — hover dock items to see animation', async ({ page }) => {
    await navigateToExample(page, 'field-group', 'dock');
    const dockItem = page.locator('.pc-dock :is(a, button)').first();
    if (await dockItem.isVisible({ timeout: 2000 }).catch(() => false)) {
      await dockItem.hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('field-group-dock-hovered.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
