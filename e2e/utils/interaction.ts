import { Page, Locator } from '@playwright/test';

/**
 * Generic input filler — fills text into an input element.
 */
export async function fillInput(page: Page, selector: string, value: string): Promise<void> {
  const el = page.locator(selector).first();
  await el.click();
  await el.fill(value);
}

/**
 * Click a button by CSS selector.
 */
export async function clickButton(page: Page, selector: string): Promise<void> {
  await page.locator(selector).first().click();
}

/**
 * Select an option from a native <select> or daisyui dropdown select.
 */
export async function selectOption(
  page: Page,
  selector: string,
  optionText: string,
): Promise<void> {
  const selectEl = page.locator(selector).first();
  // Try native select first
  const tagName = await selectEl.evaluate((el) => el.tagName);
  if (tagName === 'SELECT') {
    await selectEl.selectOption({ label: optionText });
  } else {
    // For daisyui/select, click to open then select by text
    await selectEl.click();
    await page.getByRole('option', { name: optionText }).first().click();
  }
}

/**
 * Toggle a checkbox — check or uncheck.
 */
export async function toggleCheckbox(
  page: Page,
  selector: string,
  checked?: boolean,
): Promise<void> {
  const cb = page.locator(selector).first();
  const isChecked = await cb.isChecked();
  if (checked === undefined) {
    await cb.click();
  } else if (isChecked !== checked) {
    await cb.click();
  }
}

/**
 * Expand a dropdown menu and optionally select an item.
 */
export async function expandDropdown(
  page: Page,
  triggerSelector: string,
  options?: { select?: string },
): Promise<void> {
  const trigger = page.locator(triggerSelector).first();
  await trigger.click();
  // Wait for dropdown content to appear
  await page.waitForSelector('[role="menu"], [role="listbox"], .dropdown-content, piying-view', {
    timeout: 3000,
  });
  if (options?.select) {
    await page.getByRole('option', { name: options.select }).first().click();
  }
}

/**
 * Switch to a tab by its name/label.
 */
export async function switchTab(page: Page, tabName: string): Promise<void> {
  await page.getByRole('tab', { name: tabName }).click();
  // Wait for tab content change
  await page.waitForTimeout(300);
}

/**
 * Switch to a specific step in a steps component.
 */
export async function switchStep(page: Page, stepNumber: number): Promise<void> {
  // Click the step marker or label
  const stepLocator = page.locator(`.pc-steps [role="listitem"]:nth-child(${stepNumber})`).first();
  if (await stepLocator.isVisible({ timeout: 2000 }).catch(() => false)) {
    await stepLocator.click();
  } else {
    // Fallback: click any clickable step element
    await page.locator('.pc-steps li').nth(stepNumber - 1).click();
  }
  await page.waitForTimeout(300);
}

/**
 * Open a drawer by triggering its open button.
 */
export async function openDrawer(
  page: Page,
  triggerSelector: string,
): Promise<void> {
  await page.locator(triggerSelector).first().click();
  await page.waitForSelector('pi-drawer, [role="dialog"], .drawer-content', {
    state: 'visible',
    timeout: 3000,
  });
}

/**
 * Close an overlay (drawer/dialog/confirm/toast) by its close button or backdrop.
 */
export async function closeOverlay(page: Page, selector?: string): Promise<void> {
  // Try to find and click close button
  const closeButton = page.locator('.pc-close-btn, .btn-ghost:first-of-type, [aria-label="close"]')
    .first();
  if (await closeButton.isVisible({ timeout: 1000 }).catch(() => false)) {
    await closeButton.click();
  } else {
    // Fallback: press Escape
    await page.keyboard.press('Escape');
  }
  await page.waitForTimeout(300);
}

/**
 * Click a rating star — click the Nth star element.
 */
export async function clickRating(page: Page, starCount: number): Promise<void> {
  const stars = page.locator('.pc-rating .rating :is(input, button, [role="radio"])').all();
  if (stars.length >= starCount) {
    await stars[starCount - 1].click();
  } else {
    // Fallback: click the rating container with offset
    const ratingContainer = page.locator('.pc-rating').first();
    const box = await ratingContainer.boundingBox();
    if (box) {
      const x = box.x + (box.width / stars.length) * starCount;
      await page.mouse.click(x, box.y + box.height / 2);
    }
  }
}

/**
 * Type text into a content-editable or textarea within piying-view.
 */
export async function fillPiyingInput(page: Page, value: string): Promise<void> {
  // Try to find input-like elements inside piying-view
  const input = page.locator('piying-view input').first();
  if (await input.isVisible({ timeout: 1000 }).catch(() => false)) {
    await input.click();
    await input.fill(value);
  } else {
    // Try textarea
    const textarea = page.locator('piying-view textarea').first();
    if (await textarea.isVisible({ timeout: 1000 }).catch(() => false)) {
      await textarea.click();
      await textarea.fill(value);
    }
  }
}

/**
 * Click on the PiyingView component area for general interaction.
 */
export async function clickPiyingView(page: Page): Promise<void> {
  await page.locator('piying-view').first().click();
}

/**
 * Hover over an element — useful for tooltips and hover-triggered components.
 */
export async function hoverElement(page: Page, selector: string): Promise<void> {
  await page.locator(selector).first().hover();
  await page.waitForTimeout(300);
}
