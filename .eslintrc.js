module.exports = {
  root: true,
  plugins: [
    'simple-import-sort',
    'typescript-sort-keys',
    'sort-keys-fix',
    'sort-destructure-keys',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        'sort-keys-fix/sort-keys-fix': 'warn',
        'sort-destructure-keys/sort-destructure-keys': 'warn',
        'react/jsx-sort-props': [
          'warn',
          {
            callbacksLast: false,
            shorthandFirst: true,
            ignoreCase: true,
            noSortAlphabetically: false,
            reservedFirst: true,
          },
        ],
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',
        'typescript-sort-keys/interface': 'warn',
        'typescript-sort-keys/string-enum': 'warn',
      },
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      parserOptions: {
        operations: ['./apps/graphql/**/*.graphql'],
        schema: './apps/schema/schema.graphql',
      },
      rules: {
        // "@graphql-eslint/no-unreachable-types": ["error"]
      },
    },
  ],
};
