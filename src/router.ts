import { createRouter, createWebHistory } from 'vue-router';

import EditorView from './views/EditorView.vue';
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
    {
        path: '/',
        name: 'Home',
        component: EditorView,
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
