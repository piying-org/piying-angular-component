import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Avatar', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'avatar');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-avatar.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });
});
