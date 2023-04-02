/// <reference types="Cypress" />

function terminalLog(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  );
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );
  cy.task("table", violationData);
}

describe("Accessibility tests", () => {
  beforeEach(() => {
    cy.visit("/").get("main");
    cy.injectAxe();
  });
  it("Has no detectable accessibility violations on load", () => {
    cy.checkA11y(null, null, terminalLog);
    // .then((results) => {
    //   expect(results.violations?.length).to.equal(0);
    //   Cypress.log({
    //     name: "Accessibility",
    //     message: JSON.stringify(results.violations),
    //     consoleProps: () => {
    //       return {
    //         "Accessibility violations": results.violations,
    //       };
    //     },
    //   });
    // });
  });
});
