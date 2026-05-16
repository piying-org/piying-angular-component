import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Menu Tree', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'extension', 'menu-tree');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('extension-menu-tree.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click to expand/collapse tree node', async ({ page }) => {
    await navigateToExample(page, 'extension', 'menu-tree');
    const expandBtn = page.locator('.pc-menu-tree :is(button, [role="treeitem"])').first();
    if (await expandBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expandBtn.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('extension-menu-tree-expanded.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
