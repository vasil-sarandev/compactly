import globals from 'globals';
import js from '@eslint/js';
import json from '@eslint/json';
import tsParser from '@typescript-eslint/parser';
import tseslint from '@typescript-eslint/eslint-plugin';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import turbo from 'eslint-plugin-turbo';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Base JS/TS support
  {
    files: ['*.{js,ts}', '**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'eslint-plugin-import': eslintPluginImport,
      js,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'eslint-plugin-import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },

  // JSON support
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
    rules: {
      'json/no-empty-keys': 'warn', // downgrade this to warning - new npm structure has an empty key for project root in package-lock.json
    },
  },

  // 👇 Apply Turbo rules only to the root level (monorepo convention)
  {
    files: ['*'],
    plugins: {
      turbo,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'error',
    },
  },

  // Prettier integration
  eslintPluginPrettierRecommended,
]);
