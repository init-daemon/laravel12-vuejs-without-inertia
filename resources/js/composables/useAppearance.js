export function updateTheme(value) {
    if (value === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
        document.documentElement.classList.toggle('dark', value === 'dark');
    }
}

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const handleSystemThemeChange = () => {
    const currentTheme = localStorage.getItem('theme');
    updateTheme(currentTheme || 'system');
};

export function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    updateTheme(savedTheme || 'system');
    mediaQuery.addEventListener('change', handleSystemThemeChange);
}

export function useTheme() {
    const theme = ref('system');

    onMounted(() => {
        initializeTheme();

        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            theme.value = savedTheme;
        }
    });

    function toggleTheme() {
        const newTheme = theme.value === 'dark' ? 'light' : 'dark';

        localStorage.setItem('theme', newTheme);
        theme.value = newTheme;
        
        updateTheme(newTheme);
    }

    return {
        theme,
        toggleTheme,
    };
}