import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import eslintPluginAstro from 'eslint-plugin-astro'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'

export default [
  // Игнорируемые файлы (должно быть первым)
  {
    ignores: ['dist/', 'node_modules/', '.astro/', '*.config.*']
  },
  // Конфигурация для Astro файлов
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['*.astro'],
    languageOptions: {
      parser: eslintPluginAstro.parser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro']
      }
    }
  },
  // Конфигурация для TypeScript файлов
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error'
    }
  },
  // Prettier для JS файлов
  {
    files: ['*.js', '*.jsx'],
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error'
    }
  },
  // Базовая конфигурация
  {
    plugins: {
      import: importPlugin
    },
    rules: {
      'comma-dangle': ['error', 'never'],
      semi: ['error', 'never'],
      'class-methods-use-this': 'off',
      'import/prefer-default-export': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  }
]
