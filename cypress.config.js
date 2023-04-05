const { defineConfig } = require("cypress");

module.exports = defineConfig({
  scripts: {
    start: "gatsby develop",
    "cy:run": "echo 'pippo' && npm run start & cypress run",
  },
  e2e: {
    baseUrl: "http://localhost:8000",
    specPattern: "cypress/e2e",
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
        table(message) {
          console.table(message);
          return null;
        },
      });
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
