/* eslint-disable global-require */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  numTestsKeptInMemory: 5,
  video: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'cypress-e2e-todomvc Test Report',
    reportFilename: '[name]-[datetime]-report',
    embeddedScreenshots: true,
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    baseUrl: 'https://demo.playwright.dev/todomvc/#/',
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {

    },
  },
});
