import { Page } from 'playwright';

import { RouteName, routes } from '../../src/router.js';

export type LocalStorageSetterContext = { page: Page };
export type LocalStorageSetter = (_ctx: LocalStorageSetterContext) => Promise<void>;
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

export const formatRoute = (routeName: RouteName, params: Record<string, string>): string => {
    const route = routes.find((r) => r.name === routeName);

    if (!route) {
        throw new Error(`Route ${routeName} not found!`);
    }

    const path = route.path.replace(/\/:(\w+)/g, (_, paramName) => {
        if (!params[paramName]) {
            throw new Error(`Missing param ${paramName} for route ${routeName}`);
        }

        return `/${params[paramName]}`;
    });

    return path;
};
