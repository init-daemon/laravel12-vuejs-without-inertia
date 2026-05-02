import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/pages/dashboard/Dashboard.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import Login from '@/pages/auth/Login.vue';
import ResetPassword from '@/pages/auth/ResetPassword.vue';
import ForgotPassword from '@/pages/auth/ForgotPassword.vue';
import profileRoute from './profile';
import adminUserRoute from './admin.user';
import Register from '@/pages/auth/Register.vue';
import NotFound from '@/pages/error/NotFound.vue';

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
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    },
    ...profileRoute,
    ...adminUserRoute,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const appStore = useAppStore();

    appStore.resetError();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'login' });
    } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
        next({ name: 'dashboard' });
    } else if (to.meta.requireAdmin && authStore.isAuthenticated && authStore.user?.type !== 'admin') {
        next({ name: 'dashboard' })
    } else {
        next();
    }
});

export default router;