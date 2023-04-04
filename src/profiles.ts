import { RemovableRef, StorageLike, useStorage } from '@vueuse/core';
import { v4 as uuidv4 } from 'uuid';

export interface BookmarkRow {
    title?: string;
    url: string;
    default?: boolean;
}

export interface Bookmark {
    label: string;
    icon: string;
    rows: BookmarkRow[];
}

export interface Block {
    uuid: string;
    type: 'big-card' | 'container';
}

export type BlockOptions = BigCardBlock | Container;


export interface BigCardBlock extends Block {
    type: 'big-card';
    bookmark: Bookmark;
}

export interface Container extends Block {
    type: 'container';
    direction: 'row' | 'column';
    children: Array<BlockOptions>
}


export interface Profile {
  uuid: string;
  name: string;
  root: Container;
}

export type ProfilesMap = Record<string, Profile | undefined>;

export const getProfiles = (storage: StorageLike ): RemovableRef<ProfilesMap> => {
    const profilesKey = 'layout-profiles';

    const options = { mergeDefaults: true };
    const profileDefaults: ProfilesMap  = {};

    const profiles = useStorage(profilesKey, profileDefaults, storage, options);

    return profiles;
};

export const createProfile = (props: { name?: string, root?: Container, uuid?: string | null }): Profile => {
    const profile: Profile = {
        uuid: props.uuid || uuidv4(),
        name: props.name || '',
        root: props.root || {
            uuid: uuidv4(),
            type: 'container',
            direction: 'row',
            children: [],
        },
    };

    return profile;
};

export const saveProfile = (profile: Profile, storage: StorageLike): void => {
    const profiles = getProfiles(storage);

    profiles.value[profile.uuid] = profile;
};

export const loadProfile = (profileUuid: string, storage: StorageLike): Profile => {
    const profiles = getProfiles(storage);

    const profile = profiles.value[profileUuid];

    if (!profile) {
        throw new Error(`Profile ${profileUuid} was not found.`);
    }

    return profile;
};

export const deleteProfile = (profileUuid: string, storage: StorageLike): void => {
    const profiles = getProfiles(storage);

    delete profiles.value[profileUuid];
};


export enum ContainerActions {
    ADD_CONTAINER = 'add-container',
    REMOVE_CONTAINER = 'remove-container',
    MAKE_ROW = 'make-row',
    MAKE_COLUMN = 'make-column',
    ADD_BOOKMARK = 'add-bookmark',
}

export enum BigCardActions {
    EDIT_BOOKMARK = 'edit-bookmark',
    REMOVE_BOOKMARK = 'remove-bookmark',
}

export type BlockActions = ContainerActions | BigCardActions;
