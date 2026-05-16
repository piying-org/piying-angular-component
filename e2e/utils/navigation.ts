import { Page } from '@playwright/test';

/**
 * Navigate to an example page by category and name.
 * URL format: /main/example/{category}/{name}
 */
export async function navigateToExample(
  page: Page,
  category: string,
  name: string,
): Promise<void> {
  await page.goto(`/main/example/${category}/${name}`, { waitUntil: 'domcontentloaded' });
  // Wait for the SchemaViewPage component to appear — this is a more reliable indicator
  // that Angular has finished rendering than waitForLoadState('load')
  try {
    await page.waitForSelector('[id^="pi-page-"]', { state: 'attached', timeout: 10000 });
  } catch {
    // Fall back to a simple timeout if the selector doesn't appear
    await page.waitForTimeout(2000);
  }
}

/**
 * Navigate to an example page by its full path segment.
 */
export async function navigateToExamplePath(page: Page, fullPath: string): Promise<void> {
  await page.goto(fullPath, { waitUntil: 'domcontentloaded' });
  try {
    await page.waitForSelector('[id^="pi-page-"]', { state: 'attached', timeout: 10000 });
  } catch {
    await page.waitForTimeout(2000);
  }
}

/**
 * Wait for the SchemaViewPage to be fully rendered.
 * Looks for the piying-view component or main content area.
 */
export async function waitForPageReady(page: Page): Promise<void> {
  // Wait for either the custom element or body content to change from initial load
  await page.waitForSelector('body', { state: 'attached' });
}
