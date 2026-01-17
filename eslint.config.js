import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import preferArrowPlugin from 'eslint-plugin-prefer-arrow';

export default [
  // enable react-hooks recommended (flat) rules
  reactHooks.configs.flat.recommended,
  {
    // languageOptions replaces top-level parser and parserOptions in flat config
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: 'readonly',
      },
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    // flat config uses `ignores` for ignore patterns
    ignores: ['build', '.eslintrc.cjs'],
    // in flat config plugins must be provided as an object mapping
    plugins: {
      'react-refresh': reactRefreshPlugin,
      'prefer-arrow': preferArrowPlugin,
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
      'prefer-arrow/prefer-arrow-functions': 'error',
    },
  },
];
