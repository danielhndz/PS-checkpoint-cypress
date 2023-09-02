/// <reference types="Cypress"/>

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    baseUrl: "https://reverb.com/",
    failedLoginRedirectionURL:
      "https://reverb.com/authenticate?redirect_to=https%3A%2F%2Freverb.com%2F",
  },
});
