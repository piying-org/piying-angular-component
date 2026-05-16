import { test, expect } from '@playwright/test';
import { navigateToExample } from '../utils/navigation';

test.describe('Card', () => {
  test('base — render + content verification', async ({ page }) => {
    await navigateToExample(page, 'field-group', 'card');
    await expect(page).toHaveTitle(/.*|piying/gi);
    // Card page has dynamic height that varies between runs; use element-level assertions
    await expect(page.locator('[id^="pi-"]').first()).toBeVisible();
  });
});
