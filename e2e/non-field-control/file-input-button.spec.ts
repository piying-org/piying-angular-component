import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('File Input Button', () => {
  test('base — render + screenshot', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'file-input-button');
    await expect(page).toHaveTitle(/.*|piying/gi);
    await expect(page).toHaveScreenshot('non-field-control-file-input-button.png', { fullPage: true, maxDiffPixelRatio: 0.01 });
  });
});
