import { expect, test } from '@playwright/test';

import { assertDefaultLayout } from './assertions.js';
import { LayoutBuilder } from './pom/LayoutBuilder.js';
import { formatRoute, getSetupLocalStorageFunc } from './utils.js';
import { BigCardBlock, Container } from '../../src/profiles.js';
import { RouteName } from '../../src/router.js';
import { BOOKMARKS, PROFILE_DEFAULT, PROFILE_EMPTY, PROFILE_SIMPLE } from '../fixtures/layouts.js';


test.describe('Editor View', () => {
    test.afterEach(async ({ page }) => {
        await page.evaluate(() => window.localStorage.clear());
    });

    test.describe('New profile editor', () => {
        const url = '/';

        test('Sets the correct meta', async ({ page }) => {
            await page.goto(url);

            const locator = page.locator('h1');

            await expect(locator).toContainText('Create a new Layout Profile');
        });

        test.describe('create layout workflow', () => {

            test('parses a valid layout', async ({ page }) => {
                const builder = new LayoutBuilder(page, url);
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
                const builder = new LayoutBuilder(page);
                let currentLayout = PROFILE_EMPTY;
                let targetBlock = currentLayout.root;

                await builder.setup();
                await builder.fillProfile(PROFILE_EMPTY);
                await builder.performActionOnChild(targetBlock.uuid, 'Add container');
                await builder.performActionOnChild(targetBlock.uuid, 'Add container');
                await builder.performActionOnChild(targetBlock.uuid, 'Add container');

                currentLayout = await builder.getProfileValue();
                targetBlock = currentLayout.root.children[0] as Container;
                await builder.performActionOnChild(targetBlock.uuid, 'Add container');
                await builder.performActionOnChild(targetBlock.uuid, 'Add container');
                await builder.performActionOnChild(targetBlock.uuid, 'Add container');
                await builder.performActionOnChild(targetBlock.uuid, 'Transform in a column');

                currentLayout = await builder.getProfileValue();

                targetBlock = (currentLayout.root.children[0] as Container).children[0] as Container;
                await builder.addBookmarkOnContainer(targetBlock.uuid, BOOKMARKS.gmail);

                targetBlock = (currentLayout.root.children[0] as Container).children[1] as Container;
                await builder.addBookmarkOnContainer(targetBlock.uuid, BOOKMARKS.gdrive);

                targetBlock = (currentLayout.root.children[0] as Container).children[2] as Container;
                await builder.addBookmarkOnContainer(targetBlock.uuid, BOOKMARKS.gcalendar);

                targetBlock = currentLayout.root.children[1] as Container;
                await builder.addBookmarkOnContainer(targetBlock.uuid, BOOKMARKS.chatgpt);

                targetBlock = currentLayout.root.children[2] as Container;
                await builder.addBookmarkOnContainer(targetBlock.uuid, BOOKMARKS.onepassword);

                currentLayout = await builder.getProfileValue();

                test.info().annotations.push({ type: 'finalLayout', description: JSON.stringify(currentLayout, null, 2) });

                await assertDefaultLayout(builder.app);

                const commitButton = page.getByText('Commit');
                await commitButton.click();

                const expectedUrl = formatRoute(RouteName.LAYOUT, { profileUuid: currentLayout.uuid });
                await expect(page).toHaveURL(expectedUrl);
                await assertDefaultLayout(builder.app);
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
                const expected = 'Layout Profile not found!';

                await expect(locator).toContainText(expected);
            });
        });

        test.describe('create layout workflow', () => {
            const url = `/edit/${PROFILE_DEFAULT.uuid}`;

            test.beforeEach(async ({ page }) => {
                await page.goto(url);
            });

            test('sets the correct meta', async ({ page }) => {
                const locator = page.locator('h1');
                await expect(locator).toContainText(`Edit Profile: ${PROFILE_DEFAULT.name}`);
            });

            test('renders the existing layout', async ({ page }) => {
                const locator = page.locator('#app');
                await assertDefaultLayout(locator);
            });

            test('populates edit bookmark with the existing data', async ({ page }) => {
                const builder = new LayoutBuilder(page);

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

            test('editing a bookmark without confirming doesn\'t change the layout', async ({ page }) => {
                const builder = new LayoutBuilder(page);

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
                const currentLayout = await builder.getProfileValue();

                // Test changes were discarded
                await expect(currentLayout).toEqual(PROFILE_DEFAULT);
            });


            test('updates the layout and navigates to it', async ({ page }) => {
                const profileNameInput = page.getByLabel('Profile Name');
                const editor = page.getByLabel('Layout Code');

                await profileNameInput.fill(PROFILE_SIMPLE.name);
                await editor.fill(JSON.stringify({
                    ...PROFILE_SIMPLE,
                    uuid: PROFILE_DEFAULT.uuid,
                }));

                const commitButton = page.getByText('Commit');
                await commitButton.click();

                const expectedUrl = formatRoute(RouteName.LAYOUT, { profileUuid: PROFILE_DEFAULT.uuid });
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
