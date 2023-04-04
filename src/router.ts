import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';


const EditorView = () => import('./views/EditorView.vue');
const ProfileView = () => import('./views/ProfileView.vue');

/**
 * All route names in the application.
 */
export enum RouteName {
    PROFILE__EMPTY = 'PROFILE__EMPTY',
    PROFILE = 'PROFILE',
    PROFILE_EDITOR__NEW = 'PROFILE_EDITOR__NEW',
    PROFILE_EDITOR__EXISTING = 'PROFILE_EDITOR__EXISTING',
  }

/**
   * A route in the application.
   */
export interface Route<T extends RouteName> {
    path: string;
    name: T;
    component: unknown;
    props: boolean;
  }

/**
   * Maps route names to their respective routes.
   */
export type NamedRoutes = {
    [T in RouteName]: Route<T>
  };

export const namedRoutes: NamedRoutes = {
    [RouteName.PROFILE__EMPTY]: {
        path: '/profile',
        name: RouteName.PROFILE__EMPTY,
        component: ProfileView,
        props: true,
    },
    [RouteName.PROFILE]:  {
        path: '/profile/:profileUuid',
        name: RouteName.PROFILE,
        component: ProfileView,
        props: true,
    },
    [RouteName.PROFILE_EDITOR__NEW]: {
        path: '/',
        name: RouteName.PROFILE_EDITOR__NEW,
        component: EditorView,
        props: true,
    },
    [RouteName.PROFILE_EDITOR__EXISTING]: {
        path: '/edit/:profileUuid',
        name: RouteName.PROFILE_EDITOR__EXISTING,
        component: EditorView,
        props: true,
    },
};
export const routes = Object.values(namedRoutes) as RouteRecordRaw[];

export const setupRouter = () => {
    return createRouter({
        history: createWebHistory(),
        routes,
    });
};
