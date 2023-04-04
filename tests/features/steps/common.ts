import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { setWorldConstructor } from '@cucumber/cucumber';
import { Locator, Page, expect } from '@playwright/test';
import { World, WorldOptions } from 'playwright-bdd';

import { PROFILES } from '../../fixtures/profiles.js';
import { getSetupLocalStorageFunc } from '../../playwright/utils.js';

export type LifecycleFn = (world: HookWorld) => Promise<void>;

export class HookWorld extends World {
    myBaseUrl: string;
    _initFn: LifecycleFn[];
    _destroyFn: LifecycleFn[];

    constructor(options: WorldOptions) {
        super(options);
        this.myBaseUrl = 'https://playwright.dev';
        this._initFn = [];
        this._destroyFn = [];
    }

    before(fn: LifecycleFn) {
        this._initFn.push(fn);
    }

    after(fn: LifecycleFn) {
        this._destroyFn.push(fn);
    }

    async init() {
        for await (const initFn of this._initFn) {
            await initFn(this);
        }
    }

    async destroy() {
        for await (const destroyFn of this._destroyFn) {
            await destroyFn(this);
        }
    }
}

setWorldConstructor(HookWorld);

/**
 * Select an option from a VSelect Vuetify element
 *
 * @param locator
 * @param selectTestId
 * @param optionLabel
 */
export const selectOption = async (locator: Page | Locator, selectTestId: string, optionLabel: string): Promise<void> => {
    const select = locator.getByTestId(selectTestId);
    await select.click();

    const option = locator.getByText(optionLabel);
    await option.click();
};


Given('I navigate to {string}', async function (this: HookWorld, url: string) {
    await this.page.goto(url);
});

Given('I have stored a profile {string}', async function (this: HookWorld, profileName: string) {
    const profile = PROFILES[profileName];

    if (!profile) {
        throw new Error(`Profile ${profileName} not found`);
    }

    const setupLocalStorage = getSetupLocalStorageFunc({
        'layout-profiles': JSON.stringify({
            [profile.uuid]: profile,
        })
    });

    await setupLocalStorage({ page: this.page });

    this.after(async (world: HookWorld) => {
        console.log('clearning local storage');
        await world.page.evaluate(() => window.localStorage.clear());
    });
});

Then('the h1 contains {string}', async function (this: HookWorld, h1: string) {
    const locator = await this.page.locator('h1');

    await expect(locator).toContainText(h1);
});

Then('the router-view contains {string}', async function (this: World, content: string) {
    const locator = await this.page.getByTestId('router-view');

    await expect(locator).toContainText(content);
});

Then('the test-id {string} contains {string}', async function (this: World, testId: string, content: string) {
    const locator = await this.page.getByTestId(testId);

    await expect(locator).toContainText(content);
});

Then('the page matches the screenshot', async function(this: World) {
    await expect(this.page).toHaveScreenshot({ maxDiffPixelRatio: 0.1, fullPage: true });
});

Then('the testid {string} matches the screenshot', async function(this: World, testId: string) {
    const locator = this.page.getByTestId(testId);
    const dimensions = await locator.boundingBox();
    const screenshot = await this.page.screenshot({ type: 'jpeg', clip: dimensions as {x; y; width; height }, });

    await expect(screenshot).toMatchSnapshot();
});

When('I click the {string} button', async function (this: HookWorld, buttonLabel: string) {
    const button = this.page.getByText(buttonLabel);
    await button.click();
});

When('I type in the fields', async function (this: HookWorld, dataTable: DataTable) {
    for await (const [label, value, occurrence] of dataTable.rows()) {
        let input = this.page.getByLabel(label);
        const nth = Number(occurrence);

        if (nth > -1) {
            input = input.nth(nth);
        }

        await input.fill(value);
    }
});

When('I scroll {string}', async function (this: HookWorld, direction: 'up' | 'down') {
    const scrolls = {
        up: (page) => page.mouse.wheel(0, -180),
        down: (page) => page.mouse.wheel(0, 180),
    };

    const action = scrolls[direction];

    await action(this.page);
});

When('I press {string}', async function (this: HookWorld, key: string) {
    await this.page.keyboard.press(key);
});

Then('the page URL matches {string}', async function (this: HookWorld, url: string) {
    const regex = new RegExp(url);
    await expect(this.page).toHaveURL(regex);
});
