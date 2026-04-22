import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '@pages/dashboard/Dashboard.vue';

const routes = [
    { path: '/', name: 'dashboard', component: Dashboard },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;