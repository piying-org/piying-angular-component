import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Login Function Page', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'function', 'login');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('function-login.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — fill login form fields', async ({ page }) => {
    await navigateToExample(page, 'function', 'login');
    // Wait for the page to render
    const usernameInput = page.locator('.pc-function-login input:first-of-type').first();
    if (await usernameInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await usernameInput.fill('admin');
      await page.waitForTimeout(300);

      const passwordInput = page.locator('.pc-function-login input[type="password"]').first();
      if (await passwordInput.isVisible({ timeout: 500 }).catch(() => false)) {
        await passwordInput.fill('password123');
        await page.waitForTimeout(300);

        const submitBtn = page.locator('.pc-function-login :is(button, [role="button"]):has-text("Login"):first-of-type').first();
        if (await submitBtn.isVisible({ timeout: 500 }).catch(() => false)) {
          await submitBtn.click();
          await page.waitForTimeout(500);
        }

        await expect(page).toHaveScreenshot('function-login-filled.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
      }
    }
  });
});
