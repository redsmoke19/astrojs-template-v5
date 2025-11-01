import eslintPluginAstro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';

export default [
  // Игнорируемые файлы (должно быть первым)
  {
    ignores: ['dist/', 'node_modules/', '.astro/', '*.config.*'],
  },
  // Базовая конфигурация для всех файлов
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'off',
    },
  },
  // Конфигурация для Astro файлов
  ...eslintPluginAstro.configs.recommended,
];
