import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        tailwindcss(),

        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            dirs: [
                './resources/js/composables',
                './resources/js/services',
                './resources/js/stores',
                './resources/js/utils',
            ],
            dts: 'auto-imports.d.ts',
            vueTemplate: true,
        }),

        Components({
            dirs: ['./resources/js/components'],
            extensions: ['vue'],
            dts: 'components.d.ts',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
    },
});