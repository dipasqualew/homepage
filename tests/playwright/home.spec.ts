import { test, expect } from '@playwright/test';
import { GOOD_LAYOUT, GOOD_LAYOUT_PARSED, BAD_LAYOUT } from '../fixtures/layouts.js';

test.describe("No Layout View", () => {
  test("is rendered when no layout is supplied", async ({ page }) => {
    const url = `/`;

    await page.goto(url);

    const locator = page.locator('#app');

    await expect(locator).toContainText("No layout or invalid layout supplied");
  });

  test("is rendered when a rubbish layout is supplied", async ({ page }) => {
    const url = `/?layout=${BAD_LAYOUT}`;

    await page.goto(url);

    const locator = page.locator('#app');

    await expect(locator).toContainText("No layout or invalid layout supplied");

  });

  test("parses a valid layout and provides a navigation link", async ({ page }) => {
    const url = `/?layout=${BAD_LAYOUT}`;

    await page.goto(url);

    const editor = page.locator('#no-layout-editor');

    await editor.fill(GOOD_LAYOUT)

    const locator = page.locator('#app');

    await expect(locator).toContainText(JSON.stringify(GOOD_LAYOUT_PARSED, null, 2));
  });
});

test.describe("Layout View", () => {
  test("is rendered with a valid layout", async ({ page }) => {
    const url = `/?layout=${GOOD_LAYOUT}`;

    await page.goto(url);

    const locator = page.locator('#app');

    await expect(locator).not.toContainText("No layout or invalid layout supplied");
    await expect(locator).toContainText("gmail");
    await expect(locator).toContainText("gdrive");
    await expect(locator).toContainText("gcalendar");
    await expect(locator).toContainText("chatgpt");
    await expect(locator).toContainText("1password");
  });

});
