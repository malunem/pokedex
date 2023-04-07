import { render } from "@testing-library/react";
import React from "react";
import { axe, toHaveNoViolations } from "jest-axe";
import PokemonCard, { PokemonCardProps } from "./pokemon-card";

// /static/1a17a9e52a64971002049c76cd78ac50/d689f/34.webp

expect.extend(toHaveNoViolations);

const mockPokemon = {
  name: "bulbasaur",
  transName: "Bulbasaur",
  pokemonBasic: {
    color: "green",
    number: "123",
    localFile: null,
  },
};

const makeSut = ({ pokemon }: Partial<PokemonCardProps>) =>
  render(<PokemonCard pokemon={pokemon ?? mockPokemon} />);

describe("<PokemonCard />", () => {
  it("should have no accessibility violations", async () => {
    const { container } = makeSut({
      pokemon: mockPokemon,
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Should render pokemon data correctly", () => {
    const { getByText } = makeSut({
      pokemon: mockPokemon,
    });

    expect(getByText(/Bulbasaur/)).toBeInTheDocument();
    expect(getByText(/123/)).toBeInTheDocument();
  });

  it("Should render pokemon without number", () => {
    const { getByText } = makeSut({
      pokemon: mockPokemon,
    });

    expect(getByText(/Bulbasaur/)).toBeInTheDocument();
  });
});
