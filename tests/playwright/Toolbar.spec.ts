import { expect, test } from '@playwright/test';

import { PageToolbarPOM } from './pom/PageToolbarPOM.js';
import { formatRoute, getSetupLocalStorageFunc } from './utils.js';
import { RouteName } from '../../src/router.js';
import { PROFILE_DEFAULT, PROFILE_SIMPLE } from '../fixtures/profiles.js';

test.describe('Toolbar', () => {
    test.describe('without stored profiles', () => {
        test('doesn\'t render any link', async ({ page }) => {
            const locator = page.locator('a');

            const links = await locator.all();
            await expect(links).toHaveLength(0);
        });
    });

    test.describe('with stored profiles', () => {
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
            const toolbar = new PageToolbarPOM(page);
            await toolbar.setup();

            const chips = await toolbar.getAllProfileChips();
            await expect(chips).toHaveCount(2);

            const chip = chips.first().getByText(`Profile: ${PROFILE_DEFAULT.name}`);

            await chip.click();

            const expectedUrl = formatRoute(RouteName.PROFILE, { profileUuid: PROFILE_DEFAULT.uuid });
            await expect(page).toHaveURL(expectedUrl);
        });

        test('renders a button to edit a profile', async ({ page }) => {
            const toolbar = new PageToolbarPOM(page);
            await toolbar.setup();

            const chip = toolbar.getProfileChip(PROFILE_DEFAULT.uuid);
            const editButton = chip.getByRole('link', { name: 'Edit' });
            await expect(editButton).toBeVisible();

            await editButton.click();

            const expectedUrl = formatRoute(RouteName.PROFILE_EDITOR__EXISTING, { profileUuid: PROFILE_DEFAULT.uuid });
            await expect(page).toHaveURL(expectedUrl);
        });

        test('renders a button to delete a profile', async ({ page }) => {
            const toolbar = new PageToolbarPOM(page);
            await toolbar.setup();

            const chip = toolbar.getProfileChip(PROFILE_DEFAULT.uuid);
            const deleteButton = chip.getByText('Delete');
            await expect(deleteButton).toBeVisible();

            await deleteButton.click();

            await expect(toolbar.getProfileChip(PROFILE_DEFAULT.uuid)).toHaveCount(0);

            const expectedUrl = formatRoute(RouteName.PROFILE, { profileUuid: PROFILE_DEFAULT.uuid });
            await page.goto(expectedUrl);
            await expect(toolbar.app).toContainText('404');
        });

        test('renders a clickable button to create a new profile', async ({ page }) => {
            await page.goto('/404');

            const newProfileButton = await page.getByText('New Profile');
            await expect(newProfileButton).toBeVisible();

            await newProfileButton.click();

            const expectedUrl = formatRoute(RouteName.PROFILE_EDITOR__NEW, {});
            await expect(page).toHaveURL(expectedUrl);
        });

    });

});

