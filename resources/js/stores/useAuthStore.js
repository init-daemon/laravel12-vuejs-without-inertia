import api from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref(localStorage.getItem('auth_token') || null);

    const isAuthenticated = computed(() => !!token.value);

    async function fetchAuth() {
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
        const { token: newToken, user: loggedUser } = response.data?.data;

        token.value = newToken || null;
        if (newToken) {
            localStorage.setItem('auth_token', newToken);
        }
        user.value = loggedUser;

        return loggedUser;
    }

    async function register(data) {
        const response = await api.post('/register', data);
        
        return response;
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
                await fetchAuth();
            } catch {
            }
        }
    }

    async function updatePassword(payload) {
        return await api.put('/user/password', payload);
    }

    return {
        user,
        token,
        isAuthenticated,
        fetchAuth,
        login,
        register,
        logout,
        initAuth,
        updatePassword,
    };
});