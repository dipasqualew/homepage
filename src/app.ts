import { StorageLike } from '@vueuse/core';
import { App as VueApp, createApp } from 'vue';

import AppRoot from './AppRoot.vue';
import { storageKey } from './injectionKeys';
import { router } from './router';

/**
 * Dependencies to be passed
 * to setupApp.
 */
export interface AppDependencies {
  storage: StorageLike;
}

/**
 * Returns a configured app object
 * ready to be mounted to the DOM.
 *
 * @param param0 The storage class to be used across the app
 * @returns
 */
export const setupApp = (deps: AppDependencies): VueApp<Element> => {
    const app = createApp(AppRoot);

    app.use(router);
    app.provide(storageKey, deps.storage);

    return app;
};
