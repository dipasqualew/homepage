import { test, expect } from '@playwright/test';
import { PROFILE } from '../fixtures/layouts.js';
import { getSetupLocalStorageFunc } from './utils.js';

test.describe('Layout View', () => {
    const setupLocalStorage = getSetupLocalStorageFunc({
        'layout-profiles': JSON.stringify({
            [PROFILE.uuid]: PROFILE,
        })
    });

    test.beforeEach(async ({ page }) => {
        await setupLocalStorage({ page });
    });

    test.afterAll(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => window.localStorage.clear());
    });

    test('renders 404 if the profile is not found in the storage', async ({ page }) => {
        const missingProfileUuid = 'e8ff12f4-5a57-4801-a7a7-5e39f64df59b';
        const url = `/layout/${missingProfileUuid}`;

        await page.goto(url);

        const locator = page.locator('#app');

        await expect(locator).toContainText('404');
    });

    test('renders the profile if the profile is found in the storage', async ({ page }) => {
        const url = `/layout/${PROFILE.uuid}`;

        await page.goto(url);

        const locator = page.locator('#app');

        await expect(locator).not.toContainText('No layout or invalid layout supplied');
        await expect(locator).toContainText('gmail');
        await expect(locator).toContainText('gdrive');
        await expect(locator).toContainText('gcalendar');
        await expect(locator).toContainText('chatgpt');
        await expect(locator).toContainText('1password');
    });

});
