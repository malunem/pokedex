import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Searchbar, { SearchProps as SearchbarProps } from "./searchbar";

// system under test
const makeSut = ({ classNames }: Partial<SearchbarProps>) =>
  render(<Searchbar classNames={classNames ?? ""} />);

expect.extend(toHaveNoViolations);

describe("Search", () => {
  test("should have no accessibility violations", async () => {
    const { container } = makeSut({
      classNames: "",
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders search bar", () => {
    const mockUserInput = "pikachu";

    const { getByRole } = makeSut({ classNames: "" });
    const searchInput = getByRole("textbox") as HTMLInputElement;

    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: mockUserInput } });
    expect(searchInput.value).toBe(mockUserInput);
  });

  it("shows no results if pokemon doesnt exist in index", () => {
    const mockUserInput = "charizard";

    const { getByText, getByRole } = makeSut({ classNames: "" });
    const searchInput = getByRole("textbox") as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: mockUserInput } });
    expect(getByText(`No results for ${mockUserInput}`)).toBeVisible();
  });
});
