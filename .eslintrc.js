module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  // extends: `react-app`,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict",
    // "plugin:import/recommended",
    // "plugin:ternary/recommended",
    // "plugin:react/recommended",
    "airbnb",
    "airbnb-typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: [
    // "react",
    "@typescript-eslint",
    "import",
    "ternary",
    "typescript-sort-keys",
  ],
  ignorePatterns: [
    "public/",
    "cypress/",
    "coverage/",
    "cypress.config.js",
    "__mocks__/",
    ".eslintrc.js",
    "gatsby-config.ts",
    "jest-preprocess.js",
    "jest.config.js",
    "loadershim.js",
    "setup-test-env.js",
  ],
  rules: {
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function" },
    ],
  },
  settings: {
    "import/extensions": [".tsx"],
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".tsx", ".d.tsx"],
      },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".tsx"],
    },
  },
};
