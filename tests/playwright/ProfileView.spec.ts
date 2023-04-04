import { expect, test } from '@playwright/test';

import { assertDefaultProfile } from './assertions.js';
import { getSetupLocalStorageFunc } from './utils.js';
import { BOOKMARKS, PROFILE_DEFAULT } from '../fixtures/profiles.js';

test.describe('Profile View', () => {
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
        const url = `/profile/${missingProfileUuid}`;

        test('Sets the correct meta', async ({ page }) => {
            await page.goto(url);

            const locator = page.locator('h1');

            await expect(locator).toContainText('Profile Profile: 404');

        });

        test('renders 404 if the profile is not found in the storage', async ({ page }) => {
            await page.goto(url);

            const locator = page.locator('#app');

            await expect(locator).toContainText('Profile Profile not found!');
        });
    });

    test.describe('with a valid profile uuid', () => {
        const url = `/profile/${PROFILE_DEFAULT.uuid}`;

        test('Sets the correct meta', async ({ page }) => {
            await page.goto(url);

            const locator = page.locator('h1');

            await expect(locator).toContainText(`Profile Profile: ${PROFILE_DEFAULT.name}`);
        });

        test('renders the profile in storage', async ({ page }) => {

            await page.goto(url);

            const locator = page.locator('#app');

            await assertDefaultProfile(locator);
        });

        test('renders the default row', async ({ page }) => {
            await page.goto(url);

            const locator = page.locator('[test-item-id="big-card-gmail"]');

            await expect(locator).toHaveAttribute('href', BOOKMARKS.gmail.rows[0].url);
            await expect(locator).toContainText('→ gmail:home');
        });

        const upAndDownMovements = [
            [
                (page) => page.keyboard.press('ArrowUp'),
                (page) => page.keyboard.press('ArrowDown'),
            ],
            [
                (page) => page.keyboard.press('w'),
                (page) => page.keyboard.press('s'),
            ],
            [
                (page) => page.mouse.wheel(0, -180),
                (page) => page.mouse.wheel(0, 180),
            ]
        ];

        for (const [up, down] of upAndDownMovements) {
            test(`switches to another selected row using '${up}' and '${down}'`, async ({ page }) => {
                await page.goto(url);

                const locator = page.locator('[test-item-id="big-card-gmail"]');

                await locator.hover();

                await up(page);
                await expect(locator).toHaveAttribute('href', BOOKMARKS.gmail.rows[0].url);
                await expect(locator).toContainText('→ gmail:home');

                await down(page);
                await expect(locator).toHaveAttribute('href', BOOKMARKS.gmail.rows[1].url);
                await expect(locator).toContainText('→ gmail:work');

                await down(page);
                await expect(locator).toHaveAttribute('href', BOOKMARKS.gmail.rows[1].url);
                await expect(locator).toContainText('→ gmail:work');

                await up(page);
                await expect(locator).toHaveAttribute('href', BOOKMARKS.gmail.rows[0].url);
                await expect(locator).toContainText('→ gmail:home');
            });
        }


        test('switches focus when leaving the bookmark', async ({ page }) => {
            await page.goto(url);

            const gmailBookmark = page.locator('[test-item-id="big-card-gmail"]');
            const gdriveBookmark = page.locator('[test-item-id="big-card-gdrive"]');

            await gmailBookmark.hover();
            await gdriveBookmark.hover();

            await page.keyboard.press('ArrowDown');
            await expect(gmailBookmark).toHaveAttribute('href', BOOKMARKS.gmail.rows[0].url);
            await expect(gmailBookmark).toContainText('→ gmail:home');
        });

    });


});
