import { RemovableRef, StorageLike, useStorage } from '@vueuse/core';
import {v4 as uuidv4} from 'uuid';

export interface Favourite {
    title: string;
    url: string;
    icon: string;
  }

export interface BigCard {
    block: 'big-card';
    favourite: Favourite;
  }

export interface Container {
    block: 'row' | 'column' | 'root';
    children: Array<Container | BigCard>
  }

export type Layout = BigCard | Container


export interface LayoutProfile {
  uuid: string;
  name: string;
  layout: Layout;
}

export type LayoutProfilesMap = Record<string, LayoutProfile | undefined>

export const getLayoutProfiles = (storage: StorageLike ): RemovableRef<LayoutProfilesMap> => {
    const layoutProfilesKey = 'layout-profiles';

    const options = { mergeDefaults: true };
    const profileDefaults: LayoutProfilesMap  = {};

    const layoutProfiles = useStorage(layoutProfilesKey, profileDefaults, storage, options);

    return layoutProfiles;
};

export const createProfile = (name: string, layout: Layout): LayoutProfile => {
    const profile: LayoutProfile = {
        uuid: uuidv4(),
        name,
        layout,
    };

    return profile;
};

export const saveProfile = (profile: LayoutProfile, storage: StorageLike): void => {
    const profiles = getLayoutProfiles(storage);

    profiles.value[profile.uuid] = profile;
};

export const loadProfile = (profileUuid: string, storage: StorageLike): LayoutProfile => {
    const profiles = getLayoutProfiles(storage);

    const profile = profiles.value[profileUuid];

    if (!profile) {
        throw new Error(`Profile ${profileUuid} was not found.`);
    }

    return profile;
};

