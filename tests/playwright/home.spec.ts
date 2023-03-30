import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:5173/homepage"

test.describe("home page", () => {
  test("without a layout, it renders the no-layout page", async ({ page }) => {
    const url = `${BASE_URL}`;

    await page.goto(url);

    const locator = page.locator('#app');

    await expect(locator).toContainText("No layout or invalid layout supplied");
  });

  test("with a rubbish layour, it renders the no-layout page", async ({ page }) => {
    const rubbishLayout = "rubbish-layout";
    const url = `${BASE_URL}?layout=${rubbishLayout}`;

    await page.goto(url);

    const locator = page.locator('#app');

    await expect(locator).toContainText("No layout or invalid layout supplied");

  });

  test("with a valid layout, it renders the layout", async ({ page }) => {
    const layout = "eyJibG9jayI6InJvdyIsImNoaWxkcmVuIjpbeyJibG9jayI6ImNvbHVtbiIsImNoaWxkcmVuIjpbeyJibG9jayI6ImJpZy1jYXJkIiwiZmF2b3VyaXRlIjp7InRpdGxlIjoiZ21haWwiLCJ1cmwiOiJodHRwczovL21haWwuZ29vZ2xlLmNvbS9tYWlsL3UvMC8jaW5ib3giLCJpY29uIjoiaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy83LzdlL0dtYWlsX2ljb25fJTI4MjAyMCUyOS5zdmcifX0seyJibG9jayI6ImJpZy1jYXJkIiwiZmF2b3VyaXRlIjp7InRpdGxlIjoiZ2RyaXZlIiwidXJsIjoiaHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2RyaXZlL215LWRyaXZlIiwiaWNvbiI6Imh0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvZC9kYS9Hb29nbGVfRHJpdmVfbG9nby5wbmcifX0seyJibG9jayI6ImJpZy1jYXJkIiwiZmF2b3VyaXRlIjp7InRpdGxlIjoiZ2NhbGVuZGFyIiwidXJsIjoiaHR0cHM6Ly9jYWxlbmRhci5nb29nbGUuY29tL2NhbGVuZGFyL3UvMC9yIiwiaWNvbiI6Imh0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvYS9hNS9Hb29nbGVfQ2FsZW5kYXJfaWNvbl8lMjgyMDIwJTI5LnN2ZyJ9fV19LHsiYmxvY2siOiJyb3ciLCJjaGlsZHJlbiI6W3siYmxvY2siOiJiaWctY2FyZCIsImZhdm91cml0ZSI6eyJ0aXRsZSI6ImNoYXRncHQiLCJ1cmwiOiJodHRwczovL2NoYXQub3BlbmFpLmNvbS9jaGF0P21vZGVsPWdwdC00IiwiaWNvbiI6Imh0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvMC8wNC9DaGF0R1BUX2xvZ28uc3ZnIn19LHsiYmxvY2siOiJiaWctY2FyZCIsImZhdm91cml0ZSI6eyJ0aXRsZSI6IjFwYXNzd29yZCIsInVybCI6Imh0dHBzOi8vMXBhc3N3b3JkLmNvbSIsImljb24iOiJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zLzUvNWIvMVBhc3N3b3JkX2ljb24ucG5nIn19XX1dfQ";
    const url = `${BASE_URL}?layout=${layout}`;

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
