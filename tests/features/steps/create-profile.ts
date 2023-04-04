import { Then, When } from '@cucumber/cucumber';
import { Locator, Page, expect } from '@playwright/test';

import { HookWorld, selectOption } from './common.js';

const getContainerLocator = async (page: Page, path: string): Promise<Locator> => {
    const containerName = path.split(' > ').join('-');
    const testId = `container-child:${containerName}`;
    const locator = await page.getByTestId(testId);

    return locator;
};

When('I mouse hover the container {string}', async function (this: HookWorld, path: string) {
    const locator = await getContainerLocator(this.page, path);

    await locator.hover();
});

When('I click the container {string}', async function (this: HookWorld, path: string) {
    const locator = await getContainerLocator(this.page, path);

    await locator.click({ position: { x: 5, y: 5 } });
});

When('I select the option {string} from the Container Modal', async function (this: HookWorld, optionLabel: string) {
    await selectOption(this.page, 'profile-select-action', optionLabel);
});

Then('the current path tooltip reads {string}', async function (this: HookWorld, path: string) {
    const tooltip = this.page.getByTestId('current-path');

    await expect(tooltip).toHaveText(path);
});
