import prettier from 'eslint-config-prettier'
import vue from 'eslint-plugin-vue'

export default [
    ...vue.configs['flat/essential'],

    {
        ignores: [
            'vendor',
            'node_modules',
            'public',
            'bootstrap/ssr',
            'tailwind.config.js',
            'resources/js/components/ui/*',
        ],
    },
    {
        rules: {
            'vue/multi-word-component-names': 'off',
        },
    },

    prettier,
]