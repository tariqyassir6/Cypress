const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
  },
  video: true,
  videoUploadOnPasses: true,
});



module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.booking.com/',
  }
});