import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactJSXRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import pluginImportX from 'eslint-plugin-import-x';
import pluginUnusedImport from 'eslint-plugin-unused-imports';
import pluginPreferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';
import { fixupPluginRules } from '@eslint/compat';

export default tseslint.config(
  {
    ignores: ['dist', 'public', '.wrangler', '*.config.{js, ts}'],
  },
  {
    extends: [
      eslint.configs.recommended,
      pluginImportX.flatConfigs.recommended,
    ],
    plugins: {
      'unused-imports': pluginUnusedImport,
      'prefer-arrow-functions': fixupPluginRules(pluginPreferArrowFunctions),
    },
    rules: {
      // This rule is disabled b/c it's already covered by 'eslint-plugin-unused-imports'
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'error',
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '{react,react-dom/**,react-router-dom}',
              group: 'builtin',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'never',
        },
      ],
      'prefer-arrow-functions/prefer-arrow-functions': [
        'error',
        { returnStyle: 'implicit' },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.strictTypeChecked,
      pluginImportX.flatConfigs.typescript,
    ],
    languageOptions: {
      // Need not to set 'parser' b/c it's already set by 'typescript-eslint'
      parserOptions: { project: './tsconfig.json' },
    },
    rules: {
      // This rule is disabled b/c it's already covered by 'eslint-plugin-unused-imports'
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.tsx'],
    extends: [
      pluginReact.configs.flat.all,
      pluginReactJSXRuntime,
      pluginImportX.flatConfigs.react,
      pluginJsxA11y.flatConfigs.strict,
    ],
    plugins: {
      'react-hooks': fixupPluginRules(pluginReactHooks),
    },
    rules: {
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-no-literals': 'off',
      ...pluginReactHooks.configs.recommended.rules,
    },
    settings: {
      // Need to set React version b/c it's not set by 'eslint-plugin-react'
      // https://github.com/jsx-eslint/eslint-plugin-react#configuration
      react: { version: 'detect' },
    },
  },
  prettier,
);
