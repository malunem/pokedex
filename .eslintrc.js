module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  ignorePatterns: [
    'public/',
    'cypress/',
    'cypress.config.js',
    'jest-preprocess.js',
    'loadershim.js',
    'setup-test-env.js',
    '__mocks__/',
  ],
  rules: {},
};
