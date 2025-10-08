// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // default support file path (where you should put Cypress.on('uncaught:exception', ...))
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://practice.expandtesting.com/',
    watchForFileChanges: false,

    env: {
      apiBaseUrl: 'https://practice.expandtesting.com/notes/api' 
    },
    setupNodeEvents(on, config) {

      return config;
    },
  },
});
