import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Label', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'field-control', 'label');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('field-control-label.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });
});
