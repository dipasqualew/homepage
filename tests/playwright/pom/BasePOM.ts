import { Locator, Page } from 'playwright';


export class BasePOM {
    public page: Page;
    public path: string;

    constructor(page: Page, path = '/') {
        this.page = page;
        this.path = path;
    }

    async setup() {
        await this.page.setViewportSize({ width: 1920, height: 1080 });
        await this.page.goto(this.path);
    }

    async selectOption(selectTestId: string, optionLabel: string, locator?: Locator) {
        const _locator = locator || this.page;
        const select = _locator.getByTestId(selectTestId);
        await select.click();

        const option = _locator.getByText(optionLabel);
        await option.click();
    }

    get app() {
        return this.page.locator('#app');
    }
}
