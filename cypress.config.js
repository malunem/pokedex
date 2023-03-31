const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8000",
    specPattern: "cypress/e2e",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
