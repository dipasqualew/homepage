import { expect, test } from '@playwright/test';

import { getSetupLocalStorageFunc } from './utils.js';
import { PROFILE, PROFILE_SIMPLE } from '../fixtures/layouts.js';

test.describe('Editor View', () => {
    test.describe('New profile editor', () => {
        const url = '/';

        test('Sets the correct meta', async ({ page }) => {
            await page.goto(url);

            const locator = page.locator('h1');

            await expect(locator).toContainText('Create a new Layout Profile');
        });

        test.describe('create layout workflow', () => {

            test.beforeEach(async ({ page }) => {
                await page.goto(url);

                const profileNameInput = page.getByLabel('Profile Name');
                const editor = page.getByLabel('Layout Code');

                await profileNameInput.fill(PROFILE.name);
                await editor.fill(JSON.stringify(PROFILE.layout));
            });

            test('parses a valid layout', async ({ page }) => {
                const locator = page.locator('#app');

                await expect(locator).toContainText('gmail');
                await expect(locator).toContainText('gdrive');
                await expect(locator).toContainText('gcalendar');
                await expect(locator).toContainText('chatgpt');
                await expect(locator).toContainText('1password');
            });

            test('commits, creates a new profile and navigates to it', async ({ page }) => {
                const commitButton = page.getByText('Commit');
                await commitButton.click();

                await expect(page.url()).toContain('/layout/');

                const locator = page.locator('#app');
                await expect(locator).toContainText('gmail');
                await expect(locator).toContainText('gdrive');
                await expect(locator).toContainText('gcalendar');
                await expect(locator).toContainText('chatgpt');
                await expect(locator).toContainText('1password');
            });

        });

    });


    test.describe('Existing profile editor', () => {
        const setupLocalStorage = getSetupLocalStorageFunc({
            'layout-profiles': JSON.stringify({
                [PROFILE.uuid]: PROFILE,
            })
        });

        test.beforeEach(async ({ page }) => {
            await setupLocalStorage({ page });
        });

        test.afterEach(async ({ page }) => {
            await page.evaluate(() => window.localStorage.clear());
        });


        test.describe('navigating to a non-existing profile', () => {
            const url = '/edit/6133e619-fe04-4eb4-accc-6097636bf1fe';

            test('sets the correct meta', async ({ page }) => {
                await page.goto(url);

                const locator = page.locator('h1');
                await expect(locator).toContainText('Profile not found.');
            });

            test('renders 404 if the profile is not found in the storage', async ({ page }) => {
                await page.goto(url);

                const locator = page.locator('#app');
                const expected = 'Layout Profile not found!';

                await expect(locator).toContainText(expected);
            });
        });

        test.describe('create layout workflow', () => {
            const url = `/edit/${PROFILE.uuid}`;

            test.beforeEach(async ({ page }) => {
                await page.goto(url);
            });

            test('sets the correct meta', async ({ page }) => {
                const locator = page.locator('h1');
                await expect(locator).toContainText(`Edit Profile: ${PROFILE.name}`);
            });

            test('renders the existing layout', async ({ page }) => {
                const locator = page.locator('#app');

                await expect(locator).toContainText('gmail');
                await expect(locator).toContainText('gdrive');
                await expect(locator).toContainText('gcalendar');
                await expect(locator).toContainText('chatgpt');
                await expect(locator).toContainText('1password');
            });

            test('updates the layout and navigates to it', async ({ page }) => {
                const profileNameInput = page.getByLabel('Profile Name');
                const editor = page.getByLabel('Layout Code');

                await profileNameInput.fill(PROFILE_SIMPLE.name);
                await editor.fill(JSON.stringify(PROFILE_SIMPLE.layout));

                const commitButton = page.getByText('Commit');
                await commitButton.click();

                await expect(page.url()).toContain(`/layout/${PROFILE.uuid}`);

                const locator = page.locator('#app');
                await expect(locator).toContainText('chatgpt');
                await expect(locator).not.toContainText('gmail');
                await expect(locator).not.toContainText('gdrive');
                await expect(locator).not.toContainText('gcalendar');
                await expect(locator).not.toContainText('1password');
            });

        });
    });


});
