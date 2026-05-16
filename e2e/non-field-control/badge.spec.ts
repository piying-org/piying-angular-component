import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Badge', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'badge');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-badge.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });
});
