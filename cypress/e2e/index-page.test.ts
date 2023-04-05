/// <reference types="Cypress" />

import { terminalLog } from "../support/accessibility";

const supportedLanguage = ["en", "it", "fr"];

describe("IndexPage", () => {
  it("has no accessibility violations", () => {
    cy.visit("/").get("main");
    cy.injectAxe();
    cy.checkA11y(undefined, undefined, terminalLog);
  });

  it("renders the heading according to language", () => {
    cy.visit("/");
    cy.get("html")
      .invoke("attr", "lang")
      .then((language) => {
        switch (language) {
          case "it":
            cy.contains("h1", "Ciao");
            break;
          case "fr":
            cy.contains("h1", "Salut");
          default:
            cy.contains("h1", "Hello");
            break;
        }
      });
  });

  it("renders pokemon list", () => {
    cy.visit("/");
    cy.get(".pokemon-basic").should("have.length", 200);
    cy.get(".pokemon-sprite").should("have.length", 200);
  });

  it("changes language with language selector", () => {
    cy.visit("/");
    supportedLanguage.forEach((language) => {
      console.log({ language });
      cy.get(`#language-selector #${language}`).should("exist");
      cy.get(`#language-selector #${language}`).click();
      cy.get("html").invoke("attr", "lang").should("eq", language);
    });
  });

  it("goes to pokemon detail page", () => {
    cy.visit("/");
    cy.get("#pikachu").click();
    cy.url().should("contain", "pikachu");
  });

  it("renders search results", () => {
    cy.visit("/");
    cy.get(".search__input").type("pi");
    cy.get(".item-search").should("have.length.at.least", 1);
  });
});
