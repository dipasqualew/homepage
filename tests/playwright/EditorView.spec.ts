import { expect, test } from '@playwright/test';

import { assertDefaultProfile } from './assertions.js';
import { ProfileBuilder } from './pom/ProfileBuilder.js';
import { formatRoute, getSetupLocalStorageFunc } from './utils.js';
import { BigCardBlock, Container } from '../../src/profiles.js';
import { RouteName } from '../../src/router.js';
import { BOOKMARKS, PROFILE_DEFAULT, PROFILE_EMPTY, PROFILE_SIMPLE } from '../fixtures/profiles.js';


test.describe('Editor View', () => {
    test.afterEach(async ({ page }) => {
        await page.evaluate(() => window.localStorage.clear());
    });

    test.describe('New profile editor', () => {
        const url = '/';

        test('Sets the correct meta', async ({ page }) => {
            await page.goto(url);

            const locator = page.locator('h1');

            await expect(locator).toContainText('Create a new Profile Profile');
        });

        test.describe('create profile workflow', () => {

            test('parses a valid profile', async ({ page }) => {
                const builder = new ProfileBuilder(page, url);
                await builder.setup();

                await builder.fillProfile(PROFILE_DEFAULT);

                const locator = builder.visualEditor;
                await expect(locator).toContainText('gmail');
                await expect(locator).toContainText('gdrive');
                await expect(locator).toContainText('gcalendar');
                await expect(locator).toContainText('chatgpt');
                await expect(locator).toContainText('1password');
            });

            test('commits, creates a new profile and navigates to it', async ({ page }) => {
                const builder = new ProfileBuilder(page);
                let currentProfile = PROFILE_EMPTY;
                let targetBlock = currentProfile.root;

                await builder.setup();
                await builder.fillProfile(PROFILE_EMPTY);
                await builder.performActionOnChild(targetBlock.uuid, 'Add container');
                await builder.performActionOnChild(targetBlock.uuid, 'Add container');
                await builder.performActionOnChild(targetBlock.uuid, 'Add container');

                currentProfile = await builder.getProfileValue();
                targetBlock = currentProfile.root.children[0] as Container;
                await builder.performActionOnChild(targetBlock.uuid, 'Add container');
                await builder.performActionOnChild(targetBlock.uuid, 'Add container');
                await builder.performActionOnChild(targetBlock.uuid, 'Add container');
                await builder.performActionOnChild(targetBlock.uuid, 'Transform in a column');

                currentProfile = await builder.getProfileValue();

                targetBlock = (currentProfile.root.children[0] as Container).children[0] as Container;
                await builder.addBookmarkOnContainer(targetBlock.uuid, BOOKMARKS.gmail);

                targetBlock = (currentProfile.root.children[0] as Container).children[1] as Container;
                await builder.addBookmarkOnContainer(targetBlock.uuid, BOOKMARKS.gdrive);

                targetBlock = (currentProfile.root.children[0] as Container).children[2] as Container;
                await builder.addBookmarkOnContainer(targetBlock.uuid, BOOKMARKS.gcalendar);

                targetBlock = currentProfile.root.children[1] as Container;
                await builder.addBookmarkOnContainer(targetBlock.uuid, BOOKMARKS.chatgpt);

                targetBlock = currentProfile.root.children[2] as Container;
                await builder.addBookmarkOnContainer(targetBlock.uuid, BOOKMARKS.onepassword);

                currentProfile = await builder.getProfileValue();

                test.info().annotations.push({ type: 'finalProfile', description: JSON.stringify(currentProfile, null, 2) });

                await assertDefaultProfile(builder.app);

                await builder.commitButton.click();

                const expectedUrl = formatRoute(RouteName.PROFILE, { profileUuid: currentProfile.uuid });
                await expect(page).toHaveURL(expectedUrl);
                await assertDefaultProfile(builder.app);
            });

        });

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
                const expected = 'Profile Profile not found!';

                await expect(locator).toContainText(expected);
            });
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

            test('populates edit bookmark with the existing data', async ({ page }) => {
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

                await builder.editBookmarkOnContainer(targetBlock.uuid, actions);

                // Test changes are reflected in the editor
                await expect(builder.visualEditor).toContainText('OPEN AI:EDITED');

                // Test unchanged fields are retained, e.g. the title for the second link
                await expect(builder.visualEditor).toContainText('OPEN AI:3.5');
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
