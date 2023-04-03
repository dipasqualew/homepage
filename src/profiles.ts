import { RemovableRef, StorageLike, useStorage } from '@vueuse/core';
import { v4 as uuidv4 } from 'uuid';

export interface FavouriteRow {
    title?: string;
    url: string;
    default?: boolean;
}

export interface Favourite {
    label: string;
    icon: string;
    rows: FavouriteRow[];
}

export interface Block {
    uuid: string;
    type: 'big-card' | 'container';
}

export type BlockOptions = BigCardBlock | Container;


export interface BigCardBlock extends Block {
    type: 'big-card';
    favourite: Favourite;
}

export interface Container extends Block {
    type: 'container';
    direction: 'row' | 'column';
    children: Array<BlockOptions>
}


export interface Layout {
  uuid: string;
  name: string;
  root: Container;
}

export type LayoutProfilesMap = Record<string, Layout | undefined>;

export const getLayoutProfiles = (storage: StorageLike ): RemovableRef<LayoutProfilesMap> => {
    const layoutProfilesKey = 'layout-profiles';

    const options = { mergeDefaults: true };
    const profileDefaults: LayoutProfilesMap  = {};

    const layoutProfiles = useStorage(layoutProfilesKey, profileDefaults, storage, options);

    return layoutProfiles;
};

export const createProfile = (props: { name?: string, root?: Container, uuid?: string | null }): Layout => {
    const profile: Layout = {
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

export const saveProfile = (profile: Layout, storage: StorageLike): void => {
    const profiles = getLayoutProfiles(storage);

    profiles.value[profile.uuid] = profile;
};

export const loadProfile = (profileUuid: string, storage: StorageLike): Layout => {
    const profiles = getLayoutProfiles(storage);

    const profile = profiles.value[profileUuid];

    if (!profile) {
        throw new Error(`Profile ${profileUuid} was not found.`);
    }

    return profile;
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
