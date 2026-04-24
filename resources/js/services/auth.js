import api from './api';

export const authService = {
    async login(credentials) {
        const response = await api.post('/login', credentials);
        const { token, user } = response.data;
        
        if (token) {
            localStorage.setItem('auth_token', token);
        }

        return user;
    },

    async register(data) {
        const response = await api.post('/register', data);
        const { token, user } = response.data;
        
        if (token) {
            localStorage.setItem('auth_token', token);
        }
        
        return user;
    },

    async logout() {
        try { await api.post('/logout'); } finally {
            localStorage.removeItem('auth_token');
        }
    },

    async getUser() {
        const response = await api.get('/user');
        return response.data;
    },

    isAuthenticated() {
        return !!localStorage.getItem('auth_token');
    }
};

export default authService;