import { Page } from 'playwright';

export type LocalStorageSetterContext = { page: Page };
export type LocalStorageSetter = (_ctx: LocalStorageSetterContext) => Promise<void>
export type LocalStorageDict = Record<string, string>;

export const getSetupLocalStorageFunc = (contents: LocalStorageDict): LocalStorageSetter => {

    const setter =  async ({ page }: { page: Page }) => {
        await page.goto('/');
        await page.evaluate<void, LocalStorageDict>((_contents: LocalStorageDict): void => {
            Object.entries(_contents).forEach(([key, value]) => {
                window.localStorage.setItem(key, value);
            });
        }, contents);
    };

    return setter;
};
