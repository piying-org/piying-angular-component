import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Divider', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'divider');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-divider.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });
});
