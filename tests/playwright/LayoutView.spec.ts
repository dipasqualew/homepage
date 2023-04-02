import { expect, test } from '@playwright/test';

import { getSetupLocalStorageFunc } from './utils.js';
import { PROFILE_DEFAULT } from '../fixtures/layouts.js';

test.describe('Layout View', () => {
    const setupLocalStorage = getSetupLocalStorageFunc({
        'layout-profiles': JSON.stringify({
            [PROFILE_DEFAULT.uuid]: PROFILE_DEFAULT,
        })
    });

    test.beforeEach(async ({ page }) => {
        await setupLocalStorage({ page });
    });

    test.afterEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => window.localStorage.clear());
    });

    test.describe('with an invalid profile uuid', () => {
        const missingProfileUuid = 'e8ff12f4-5a57-4801-a7a7-5e39f64df59b';
        const url = `/layout/${missingProfileUuid}`;

        test('Sets the correct meta', async ({ page }) => {
            await page.goto(url);

            const locator = page.locator('h1');

            await expect(locator).toContainText('Layout Profile: 404');

        });

        test('renders 404 if the profile is not found in the storage', async ({ page }) => {
            await page.goto(url);

            const locator = page.locator('#app');

            await expect(locator).toContainText('Layout Profile not found!');
        });
    });

    test.describe('with a valid profile uuid', () => {
        const url = `/layout/${PROFILE_DEFAULT.uuid}`;

        test('Sets the correct meta', async ({ page }) => {
            await page.goto(url);

            const locator = page.locator('h1');

            await expect(locator).toContainText(`Layout Profile: ${PROFILE_DEFAULT.name}`);
        });

        test('renders the layout in storage', async ({ page }) => {

            await page.goto(url);

            const locator = page.locator('#app');

            await expect(locator).toContainText('gmail');
            await expect(locator).toContainText('gdrive');
            await expect(locator).toContainText('gcalendar');
            await expect(locator).toContainText('chatgpt');
            await expect(locator).toContainText('1password');
        });
    });


});
