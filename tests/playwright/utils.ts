import { Page } from 'playwright';

export type localStorageSetter = ({ page }: { page: Page }) => Promise<void>
export type localStorageDict = Record<string, string>;

export const getSetupLocalStorageFunc = (contents: localStorageDict): localStorageSetter => {

    const setter =  async ({ page }: { page: Page }) => {
        await page.goto('/');
        await page.evaluate<void, localStorageDict>((_contents: localStorageDict): void => {
            Object.entries(_contents).forEach(([key, value]) => {
                window.localStorage.setItem(key, value);
            });
        }, contents);
    };

    return setter;
};
