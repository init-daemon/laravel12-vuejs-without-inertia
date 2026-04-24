import '../css/app.css';
import '../css/theme.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import { initializeTheme } from './composables/useAppearance';
import AppLayout from './layouts/AppLayout.vue';

const app = createApp(AppLayout);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');

initializeTheme();