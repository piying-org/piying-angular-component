import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Card2', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'card2');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-card2.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });
});
