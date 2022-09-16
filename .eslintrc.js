module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:cypress/recommended',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': 'off',
  },
  plugins: [
    'cypress',
  ],
};
