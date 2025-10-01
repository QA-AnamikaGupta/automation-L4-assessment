// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // default support file path (where you should put Cypress.on('uncaught:exception', ...))
    supportFile: 'cypress/support/e2e.js',

    baseUrl: 'https://practice.expandtesting.com/',
    apiBaseUrl: 'https://practice.expandtesting.com/notes/api',
    watchForFileChanges: false,

    setupNodeEvents(on, config) {
      // Node-side hooks go here (task registration, dotenv loading, plugin hooks)
      // Do NOT reference browser globals like `Cypress`, `window`, or DOM APIs here.

      // Example: load env from .env if you wish (uncomment if you installed dotenv)
      // const dotenv = require('dotenv');
      // dotenv.config();
      // config.env.MY_VAR = process.env.MY_VAR;

      return config;
    },
  },
});
