import { inject, ref } from 'vue';

import { storageKey } from './injectionKeys';


const title = ref('');

/**
 * Gets the page meta information
 *
 * @returns
 */
export const useMeta = () => {
    return {
        title,
    };
};

/**
 * Gets the StorageLike instance to be used
 * in the current context.
 */
export const useStorage = () => inject(storageKey, ()  => localStorage, true);
