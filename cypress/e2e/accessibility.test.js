/// <reference types="Cypress" />

describe("Accessibility tests", () => {
  beforeEach(() => {
    cy.visit("/").get("main");
    cy.injectAxe();
  });
  it("Has no detectable accessibility violations on load", () => {
    cy.checkA11y().then((results) => {
      expect(results.violations.length).to.equal(0);
      Cypress.log({
        name: "Accessibility",
        message: JSON.stringify(results.violations),
        consoleProps: () => {
          return {
            "Accessibility violations": results.violations,
          };
        },
      });
    });
  });
});
