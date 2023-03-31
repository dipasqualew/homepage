import { test, expect } from '@playwright/test';
import { GOOD_LAYOUT, GOOD_LAYOUT_PARSED, PROFILE } from '../fixtures/layouts.js';
import { getSetupLocalStorageFunc } from './utils.js';

test.describe('Editor View', () => {

    test.describe('without stored profiles', () => {
        test('parses a valid layout and provides a navigation link', async ({ page }) => {
            const url = '/';

            await page.goto(url);

            const editor = page.locator('#no-layout-editor');

            await editor.fill(GOOD_LAYOUT);

            const locator = page.locator('#app');

            await expect(locator).toContainText(JSON.stringify(GOOD_LAYOUT_PARSED, null, 2));
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