import { StorageLike } from '@vueuse/core';
import type { InjectionKey } from 'vue';

export const storageKey = Symbol() as InjectionKey<StorageLike>;
