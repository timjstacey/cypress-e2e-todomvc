const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demo.playwright.dev/todomvc/#/',
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
