/// <reference types="Cypress" />

import { terminalLog } from "../support/accessibility";

describe("PokemonPage", () => {
  it("has no accessibility violations", () => {
    cy.visit("/pokemon/chikorita").get("main");
    cy.injectAxe();
    cy.checkA11y(undefined, undefined, terminalLog);
  });

  it("renders a random pokemon page", () => {
    cy.visit("/");

    cy.get(".pokemon-basic").then(($pokemons) => {
      const randomIndex = Cypress._.random(0, $pokemons.length - 1);
      cy.wrap($pokemons[randomIndex]).click();
      cy.get(".pokemon-name").should("be.visible");
      cy.get(".pokemon-number").should("be.visible");
      cy.get(".pokemon-description").should("be.visible");
      cy.get(".pokemon-genus").should("be.visible");
      cy.get(".pokemon-sprite").should("be.visible");
    });
  });
});
