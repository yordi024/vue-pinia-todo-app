/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  plugins: ['prettier'],
  rules: {
    'vue/multi-word-component-names': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'warn',
      {
        $schema: 'https://json.schemastore.org/prettierrc',
        semi: false,
        tabWidth: 2,
        singleQuote: true,
        printWidth: 80,
        trailingComma: 'all',
        useTabs: false,
        endOfLine: 'auto',
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
