describe("PokemonPage", () => {

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
