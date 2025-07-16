import js from "@eslint/js";
import json from "@eslint/json";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import turbo from "eslint-plugin-turbo";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base JS/TS support
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      js,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // JSON support
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
    rules: {
      "json/no-empty-keys": "warn", // downgrade this to warning - new npm structure has an empty key for project root in package-lock.json
    },
  },

  // 👇 Apply Turbo rules only to the root level (monorepo convention)
  {
    files: ["*"],
    plugins: {
      turbo,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "error",
    },
  },

  // Prettier integration
  eslintPluginPrettierRecommended,
]);
