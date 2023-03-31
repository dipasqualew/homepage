import { createRouter, createWebHistory } from 'vue-router';

import LayoutView from './views/LayoutView.vue';
import EditorView from './views/EditorView.vue';

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
