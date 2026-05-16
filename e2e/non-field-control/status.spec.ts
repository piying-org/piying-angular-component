import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Status', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'status');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-status.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });
});
