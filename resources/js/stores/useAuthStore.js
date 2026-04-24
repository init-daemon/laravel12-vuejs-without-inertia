import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref(localStorage.getItem('auth_token') || null);

    const isAuthenticated = computed(() => !!token.value);

    async function fetchUser() {
        try {
            const response = await api.get('/user');

            user.value = response.data?.data;
        } catch (error) {
            user.value = null;
            token.value = null;
            localStorage.removeItem('auth_token');
            
            throw error;
        }
    }

    async function login(credentials) {
        const response = await api.post('/login', credentials);
        const { token: newToken, user: loggedUser } = response.data;

        token.value = newToken || null;
        if (newToken) {
            localStorage.setItem('auth_token', newToken);
        }
        user.value = loggedUser;

        return loggedUser;
    }

    async function register(data) {
        const response = await api.post('/register', data);
        const { token: newToken, user: newUser } = response.data;

        token.value = newToken || null;
        if (newToken) {
            localStorage.setItem('auth_token', newToken);
        }
        user.value = newUser;

        return newUser;
    }

    async function logout() {
        try {
            await api.post('/logout');
        } catch (error) {
        }

        token.value = null;
        user.value = null;
        localStorage.removeItem('auth_token');
    }

    async function initAuth() {
        if (isAuthenticated.value) {
            try {
                await fetchUser();
            } catch {
            }
        }
    }

    return {
        user,
        token,
        isAuthenticated,
        fetchUser,
        login,
        register,
        logout,
        initAuth,
    };
});