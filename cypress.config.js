// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // default support file path (where you should put Cypress.on('uncaught:exception', ...))
    supportFile: 'cypress/support/e2e.js',
    baseUrl: "https://practice.expandtesting.com/",
    apiBaseUrl: 'https://practice.expandtesting.com/notes/api',
    watchForFileChanges: false,

    env: {
      CYPRESS_API_USERNAME: process.env.CYPRESS_API_USERNAME,
      CYPRESS_API_PASSWORD: process.env.CYPRESS_API_PASSWORD,
    },
    setupNodeEvents(on, config) {

      return config;
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome-report',
      overwrite: false,
      html: false,
      json: true,
    }
  },
});
