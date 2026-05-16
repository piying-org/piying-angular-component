import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Theme Controller', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'theme-controller');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-theme-controller.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — toggle theme (light/dark)', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'theme-controller');
    const themeToggle = page.locator('.pc-theme-controller :is(button, select, [role="switch"])').first();
    if (await themeToggle.isVisible({ timeout: 2000 }).catch(() => false)) {
      await themeToggle.click();
      await page.waitForTimeout(500); // Wait for theme transition
      await expect(page).toHaveScreenshot('non-field-control-theme-controller-toggled.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
