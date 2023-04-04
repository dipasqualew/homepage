import { expect, test } from '@playwright/test';

import { assertDefaultProfile } from './assertions.js';
import { ProfileBuilder } from './pom/ProfileBuilder.js';
import { formatRoute, getSetupLocalStorageFunc } from './utils.js';
import { BigCardBlock, Container } from '../../src/profiles.js';
import { RouteName } from '../../src/router.js';
import { PROFILE_DEFAULT, PROFILE_SIMPLE } from '../fixtures/profiles.js';


test.describe('Editor View', () => {
    test.afterEach(async ({ page }) => {
        await page.evaluate(() => window.localStorage.clear());
    });


    test.describe('Existing profile editor', () => {
        const setupLocalStorage = getSetupLocalStorageFunc({
            'layout-profiles': JSON.stringify({
                [PROFILE_DEFAULT.uuid]: PROFILE_DEFAULT,
            })
        });

        test.beforeEach(async ({ page }) => {
            await setupLocalStorage({ page });
        });

        test.describe('create profile workflow', () => {
            const url = `/edit/${PROFILE_DEFAULT.uuid}`;

            test.beforeEach(async ({ page }) => {
                await page.goto(url);
            });

            test('sets the correct meta', async ({ page }) => {
                const locator = page.locator('h1');
                await expect(locator).toContainText(`Edit Profile: ${PROFILE_DEFAULT.name}`);
            });

            test('renders the existing profile', async ({ page }) => {
                const locator = page.locator('#app');
                await assertDefaultProfile(locator);
            });

            test('throws a user feedback error when trying to edit the profile uuid', async ({ page }) => {
                const builder = new ProfileBuilder(page);

                await builder.codeEditor.fill(JSON.stringify({
                    ...PROFILE_DEFAULT,
                    uuid: '0a85b9a2-e124-4359-988c-3523b2573a1d',
                }));

                await builder.commitButton.click();

                const feedback = builder.getUserFeedbackByText('Profile UUID cannot be changed');
                await expect(feedback).toBeVisible();
            });

            test('editing a bookmark without confirming doesn\'t change the profile', async ({ page }) => {
                const builder = new ProfileBuilder(page);

                const targetBlock = (PROFILE_DEFAULT.root.children[1] as Container).children[0] as BigCardBlock;
                const actions = [
                    {
                        field: 'Label',
                        value: 'OPEN AI',
                    },
                    {
                        index: 0,
                        field: 'Title (Optional)',
                        value: 'EDITED'
                    }
                ];

                await builder.editBookmarkOnContainer(targetBlock.uuid, actions, false);
                const currentProfile = await builder.getProfileValue();

                // Test changes were discarded
                await expect(currentProfile).toEqual(PROFILE_DEFAULT);
            });


            test('updates the profile and navigates to it', async ({ page }) => {
                const profileNameInput = page.getByLabel('Profile Name');
                const editor = page.getByLabel('Profile Code');

                await profileNameInput.fill(PROFILE_SIMPLE.name);
                await editor.fill(JSON.stringify({
                    ...PROFILE_SIMPLE,
                    uuid: PROFILE_DEFAULT.uuid,
                }));

                const commitButton = page.getByText('Commit');
                await commitButton.click();

                const expectedUrl = formatRoute(RouteName.PROFILE, { profileUuid: PROFILE_DEFAULT.uuid });
                await expect(page).toHaveURL(expectedUrl);

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
