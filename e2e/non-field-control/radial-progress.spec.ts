import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Radial Progress', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'radial-progress');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-radial-progress.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });
});
