import { v4 as uuidv4 } from 'uuid';
import { inject, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';

import { FeedbackError } from './errors';
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
 * Models feedback for the user
 */
export interface UserFeedback {
    uuid: string;
    color: string;
    message: string;
    timeout: number;
}

/**
 * Current feedback for the user
 */
const userFeedbacks = ref<UserFeedback[]>([]);

/**
 * Adds a feedback message to the user
 *
 * @param message
 * @param color
 * @param timeout
 * @returns
 */
const pushFeedback = (message: string, color = 'red', timeout = 2000) => {
    const userFeedback = { uuid: uuidv4(), color, message, timeout };
    userFeedbacks.value.push(userFeedback);

    return userFeedback;
};

/**
 * Removes a feedback message from the user
 *
 * @param feedbackUuid
 */
const removeFeedback = (feedbackUuid: string): void => {
    const index = userFeedbacks.value.findIndex(n => n.uuid === feedbackUuid);

    if (index === -1) {
        throw new Error(`Notification ${feedbackUuid} was not found.`);
    }

    userFeedbacks.value.splice(index, 1);
};

/**
 * Gets the feedback methods to be used
 *
 * @returns
 */
export const useFeedback = () => {
    return {
        userFeedbacks,
        pushFeedback,
        removeFeedback,
    };
};

/**
 * Error handler to be passed to the Vue app
 *
 * @param error
 * @param _vm
 * @param _info
 */
export const errorHandler = (error: unknown, _vm: ComponentPublicInstance | null, _info: string) => {
    if (error instanceof FeedbackError) {
        pushFeedback(error.message, 'red');

        if (error.critical) {
            throw error;
        }
    } else {
        throw error;
    }
};

/**
 * Gets the StorageLike instance to be used
 * in the current context.
 */
export const useStorage = () => inject(storageKey, ()  => localStorage, true);
