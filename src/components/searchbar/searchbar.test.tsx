import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { ChakraProvider } from "@chakra-ui/react";
import Searchbar from "./searchbar";

expect.extend(toHaveNoViolations);

const makeSut = () =>
  render(
    <ChakraProvider>
      <Searchbar />
    </ChakraProvider>
  );

describe("Search", () => {
  it("should have no accessibility violations", async () => {
    const { container } = makeSut();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders search button", () => {
    const mockUserInput = "pikachu";

    const { getByRole } = makeSut();
    const searchButton = getByRole("button") as HTMLInputElement;

    expect(searchButton).toBeInTheDocument();

    fireEvent.change(searchButton, { target: { value: mockUserInput } });
    expect(searchButton.value).toBe(mockUserInput);
  });

  it("shows no results if pokemon doesn't exist in index", () => {
    const { getByText, getByRole } = makeSut();

    const searchButton = getByRole("button");

    // open search modal
    fireEvent.click(searchButton);
    const searchInput = getByRole("textbox");
    expect(searchInput).toBeTruthy();

    // search charizard, which is not in the website
    const mockUserInput = "charizard";
    fireEvent.change(searchInput, { target: { value: mockUserInput } });

    expect(getByText(`0 results-for "${mockUserInput}"`)).toBeInTheDocument();
  });
});
