import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/pages/dashboard/Dashboard.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import Login from '@/pages/auth/Login.vue';
import profileRoute from './profile';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresGuest: true },
    },
    ...profileRoute,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'login' });
    } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
        next({ name: 'dashboard' });
    } else {
        next();
    }
});

export default router;