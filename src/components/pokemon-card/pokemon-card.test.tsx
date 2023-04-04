import { render } from "@testing-library/react";
import React from "react";
import { axe, toHaveNoViolations } from "jest-axe";
import PokemonCard, { PokemonCardProps } from "./pokemon-card";

// /static/1a17a9e52a64971002049c76cd78ac50/d689f/34.webp

expect.extend(toHaveNoViolations);

const pokemonMock = {
  name: "Pikachu",
  transName: "PikachuTranslated",
  pokemonBasic: {
    number: "123",
    localFile: null,
  },
};

const makeSut = ({ pokemon }: Partial<PokemonCardProps>) =>
  render(<PokemonCard pokemon={pokemon ?? pokemonMock} />);

describe("<PokemonCard />", () => {
  test("should have no accessibility violations", async () => {
    const { container } = makeSut({
      pokemon: {
        transName: "Bulbasaur",
        name: "bulbasaur",
        pokemonBasic: { number: null, localFile: null },
      },
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test("Should render pokemon data correctly", () => {
    const { getByText, getByRole } = makeSut({
      pokemon: {
        transName: "Bulbasaur",
        name: "bulbasaur",
        pokemonBasic: { number: "123", localFile: null },
      },
    });

    expect(getByText(/Bulbasaur/)).toBeInTheDocument();
    expect(getByText(/123/)).toBeInTheDocument();
    expect(getByRole("link")).toHaveAttribute("href", "/pokemon/bulbasaur");
  });

  test("Should render pokemon without number", () => {
    const { getByText, getByRole } = makeSut({
      pokemon: {
        transName: "Bulbasaur",
        name: "bulbasaur",
        pokemonBasic: { number: null, localFile: null },
      },
    });

    expect(getByText(/Bulbasaur/)).toBeInTheDocument();
    expect(getByRole("link")).toHaveAttribute("href", "/pokemon/bulbasaur");
  });
});
