import { expect, test } from '@playwright/test';

import { getSetupLocalStorageFunc } from './utils.js';
import { GOOD_LAYOUT_STRING, PROFILE } from '../fixtures/layouts.js';

test.describe('Editor View', () => {

    test('Sets the correct meta', async ({ page }) => {
        const url = '/';

        await page.goto(url);

        const locator = page.locator('h1');

        await expect(locator).toContainText('Create a new Layout Profile');

    });

    test.describe('without stored profiles', () => {
        test('parses a valid layout and provides a navigation link', async ({ page }) => {
            const url = '/';

            await page.goto(url);

            const editor = page.locator('#no-layout-editor');

            await editor.fill(GOOD_LAYOUT_STRING);

            const locator = page.locator('#app');

            await expect(locator).toContainText('gmail');
            await expect(locator).toContainText('gdrive');
            await expect(locator).toContainText('gcalendar');
            await expect(locator).toContainText('chatgpt');
            await expect(locator).toContainText('1password');
        });

        test('doesn\'t render any link', async ({ page }) => {
            const url = '/';

            await page.goto(url);

            const locator = page.locator('a');

            const links = await locator.all();
            await expect(links).toHaveLength(0);

        });
    });

    test.describe('with stored profiles', () => {
        const setupLocalStorage = getSetupLocalStorageFunc({
            'layout-profiles': JSON.stringify({
                [PROFILE.uuid]: PROFILE,
            })
        });

        test.beforeEach(async ({ page }) => {
            await setupLocalStorage({ page });
        });

        test.afterEach(async ({ page }) => {
            await page.goto('/');
            await page.evaluate(() => window.localStorage.clear());
        });

        test('renders a clickable list of profiles', async ({ page }) => {
            const url = '/';

            await page.goto(url);

            const locator = page.locator('a');

            const links = await locator.all();
            await expect(links).toHaveLength(1);

            const link = links[0];
            await expect(link).toContainText(PROFILE.name);

            const href = await link.getAttribute('href');
            await expect(href).toContain(PROFILE.uuid);
        });

    });

});
