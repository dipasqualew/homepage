import { expect, test } from '@playwright/test';

import { getSetupLocalStorageFunc } from './utils.js';
import { PROFILE_DEFAULT, PROFILE_SIMPLE } from '../fixtures/layouts.js';

test.describe('Toolbar', () => {
    test.describe('without stored profiles', () => {
        test('doesn\'t render any link', async ({ page }) => {
            const locator = page.locator('a');

            const links = await locator.all();
            await expect(links).toHaveLength(0);
        });
    });

    test.describe('with stored profiles', () => {
        const url = '/';

        const setupLocalStorage = getSetupLocalStorageFunc({
            'layout-profiles': JSON.stringify({
                [PROFILE_DEFAULT.uuid]: PROFILE_DEFAULT,
                [PROFILE_SIMPLE.uuid]: PROFILE_SIMPLE,
            })
        });

        test.beforeEach(async ({ page }) => {
            await setupLocalStorage({ page });
        });

        test.afterEach(async ({ page }) => {
            await page.evaluate(() => window.localStorage.clear());
        });

        test('renders a clickable list of profiles', async ({ page }) => {
            await page.goto(url);

            const locator = page.locator('a');

            const links = await locator.all();
            await expect(links).toHaveLength(2);

            const link = links[0];
            await expect(link).toContainText(PROFILE_DEFAULT.name);

            const href = await link.getAttribute('href');
            await expect(href).toContain(PROFILE_DEFAULT.uuid);
        });

    });

});

