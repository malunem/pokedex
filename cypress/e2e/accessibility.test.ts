/// <reference types="Cypress" />
/// <reference types="Cypress-axe"/>

import { terminalLog } from "../support/accessibility";

  const pages = ["/", "/pokemon/chikorita", "/trigger-404"]

  it("Has no accessibility violations", () => {
    pages.forEach((page) => {
      cy.visit(page).get("main");
      cy.injectAxe();
      cy.checkA11y(undefined, undefined, terminalLog);

    })
  });
