import '../css/app.css';
import { createApp } from 'vue';
import { initializeTheme } from './composables/useAppearance';
import AppLayout from './layouts/AppLayout.vue';
import Route from './router'

const app = createApp(AppLayout);

app.use(Route);

app.mount('#app');

initializeTheme();