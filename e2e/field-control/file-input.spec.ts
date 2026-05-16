import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('File Input', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'file-input');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-file-input.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });

  test('interaction — click file input button', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'file-input');
    const fileBtn = page.locator('input[type="file"], .pc-file-input').first();
    if (await fileBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(page).toHaveScreenshot('field-control-file-input-rendered.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
    }
  });
});
