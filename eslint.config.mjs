import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";


export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs'  //  esto es clave porque usas require()
    },
    plugins: {},
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single']
    }
  }
];