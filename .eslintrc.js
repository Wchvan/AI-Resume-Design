module.exports = {
    parser: 'vue-eslint-parser',

    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },

    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],

    rules: {
        // override/add rules settings here, such as:
        '@typescript-eslint/no-explicit-any': ['off'],
        'vue/multi-word-component-names': 'off',
        'vue/valid-v-slot': 'off',
        'vue/valid-v-model': 'off',
    },
};
