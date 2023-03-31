import { createRouter, createWebHistory } from 'vue-router';

import Layout from './views/Layout.vue';

export const routes = [
  {
    path: '/layout',
    name: 'EmptyLayout',
    component: Layout,
  },
  {
    path: '/layout/:layout',
    name: 'Layout',
    component: Layout,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
