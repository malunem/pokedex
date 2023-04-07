/// <reference types="Cypress" />

import { terminalLog } from "../support/accessibility";

describe("IndexPage", () => {
  it("has no accessibility violations", () => {
    cy.visit("/").get("main");
    cy.injectAxe();
    cy.checkA11y(undefined, undefined, terminalLog);
  });

  it("renders the language according to url", () => {
    cy.visit("/fr");
    cy.get("html").invoke("attr", "lang").should("eq", "fr");
  });

  it("renders pokemon list", () => {
    cy.visit("/");
    cy.get(".pokemon-basic").should("have.length", 200);
    cy.get(".pokemon-sprite").should("have.length", 200);
  });

  it("goes to pokemon detail page", () => {
    cy.visit("/");
    cy.get("#pikachu").click();
    cy.url().should("contain", "pikachu");
  });

  it("renders search results", () => {
    cy.visit("/");
    cy.get("#search-button").click();
    cy.get(".search__input").type("pi");
    cy.get(".search-result-item").should("have.length.at.least", 1);
  });
});
