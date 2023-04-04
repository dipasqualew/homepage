import { StorageLike } from '@vueuse/core';
import { App as VueApp, createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import AppRoot from './AppRoot.vue';
import { errorHandler } from './hooks';
import { storageKey } from './injectionKeys';
import { setupRouter } from './router';


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

    const router = setupRouter();

    const vuetify = createVuetify({
        components,
        directives,
    });

    app.use(router);
    app.use(vuetify);
    app.provide(storageKey, deps.storage);

    app.config.errorHandler = errorHandler;

    return app;
};
