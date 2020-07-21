module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettierx/default'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettierx'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
    prettierx: {
      options: {
        usePrettierrc: true,
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
