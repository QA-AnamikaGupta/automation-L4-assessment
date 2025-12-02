// cypress.config.js
const { defineConfig } = require('cypress');
require('dotenv').config()  

module.exports = defineConfig({
  e2e: {
    // default support file path (where you should put Cypress.on('uncaught:exception', ...))
    supportFile: 'cypress/support/e2e.js',
    // set baseUrl from your exported var
    baseUrl: process.env.CYPRESS_TEST_BASE_URL,
    apiBaseUrl: process.env.CYPRESS_TEST_API_URL,
    watchForFileChanges: false,

    env: {
      TEST_BASE_URL: process.env.CYPRESS_TEST_BASE_URL,
      TEST_API_URL: process.env.CYPRESS_TEST_API_URL,
      API_USERNAME: process.env.CYPRESS_API_USERNAME,
      API_PASSWORD: process.env.CYPRESS_API_PASSWORD,
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
