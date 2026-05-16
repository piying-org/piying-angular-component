import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Alert', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'alert');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-alert.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });
});
