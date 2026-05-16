import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('KBD', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'kbd');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-kbd.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });
});
