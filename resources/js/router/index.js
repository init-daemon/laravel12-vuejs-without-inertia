import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/pages/dashboard/Dashboard.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import Login from '@/pages/auth/Login.vue';
import ResetPassword from '@/pages/auth/ResetPassword.vue';
import ForgotPassword from '@/pages/auth/ForgotPassword.vue';
import profileRoute from './profile';
import Register from '@/pages/auth/Register.vue';

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
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { requiresGuest: true },
    },
    {
        path: '/reset-password/:token',
        name: 'password.reset',
        component: ResetPassword,
    },
    {
        path: '/forgot-password',
        name: 'password.forgot',
        component: ForgotPassword,
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