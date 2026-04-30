import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
    const isResourceNotFound = ref(false);
    const isInternalServerError = ref(false);
    const theme = ref(localStorage.getItem('theme') || 'system')

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = (value) => {
        if (value === 'system') {
            const systemTheme = mediaQuery.matches ? 'dark' : 'light'
            
            document.documentElement.classList.toggle('dark', systemTheme === 'dark')
        } else {
            document.documentElement.classList.toggle('dark', value === 'dark')
        }
    }

    const setTheme = (value) => {
        theme.value = value

        localStorage.setItem('theme', value)
        applyTheme(value)
    }

    const toggleTheme = () => {
        const newTheme = theme.value === 'dark' ? 'light' : 'dark'

        setTheme(newTheme)
    }

    const initTheme = () => {
        applyTheme(theme.value)

        mediaQuery.addEventListener('change', () => {
            if (theme.value === 'system') {
                applyTheme('system')
            }
        })
    }

    const resetError = () => {
        isResourceNotFound.value = false;
        isInternalServerError.value = false;
    }

    return {
        theme,
        isResourceNotFound,
        isInternalServerError,
        
        setTheme,
        toggleTheme,
        initTheme,
        resetError,
    }
})