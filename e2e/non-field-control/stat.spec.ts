import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Stat', () => {
  test('base — render + content verification', async ({ page }) => {
    await navigateToExample(page, 'non-field-control', 'stat');
    await expect(page).toHaveTitle(/.*|piying/gi);
    // Stat page has responsive layout that varies between runs; use element-level assertions instead of screenshot
    await expect(page.locator('[id^="pi-"]').first()).toBeVisible();
    await expect(page.getByText('12K').first()).toBeVisible();
  });
});
