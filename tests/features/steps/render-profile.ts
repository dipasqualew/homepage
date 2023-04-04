import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { HookWorld } from './common.js';


Then('there is a BigCard with label {string}', async function (this: HookWorld, label: string) {
    const locator = await this.page.getByTestId('router-view');

    await expect(locator).toContainText(label);
});

Then(
    'it renders the default row for the bookmark {string} and the row {string}',
    async function (this: HookWorld, bookmarkPrefix: string, bookMarkTitle: string) {
        const locator = this.page.locator(`[test-item-id="big-card-${bookmarkPrefix}"]`);

        await expect(locator).toContainText(`→ ${bookmarkPrefix}:${bookMarkTitle}`);
    }
);

When('I hover the bookmark {string}', async function (this: HookWorld, bookmarkPrefix: string) {
    const locator = this.page.locator(`[test-item-id="big-card-${bookmarkPrefix}"]`);

    await locator.hover();
});
