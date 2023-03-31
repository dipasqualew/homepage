import { createRouter, createWebHistory } from 'vue-router';

import LayoutView from './views/LayoutView.vue';

export const routes = [
    {
        path: '/layout',
        name: 'EmptyLayout',
        component: LayoutView,
    },
    {
        path: '/layout/:layout',
        name: 'Layout',
        component: LayoutView,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
