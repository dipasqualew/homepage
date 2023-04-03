import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';


const EditorView = () => import('./views/EditorView.vue');
const LayoutView = () => import('./views/LayoutView.vue');

/**
 * All route names in the application.
 */
export enum RouteName {
    LAYOUT__EMPTY = 'LAYOUT__EMPTY',
    LAYOUT = 'LAYOUT',
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
    [RouteName.LAYOUT__EMPTY]: {
        path: '/layout',
        name: RouteName.LAYOUT__EMPTY,
        component: LayoutView,
        props: true,
    },
    [RouteName.LAYOUT]:  {
        path: '/layout/:profileUuid',
        name: RouteName.LAYOUT,
        component: LayoutView,
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
