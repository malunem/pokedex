import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./layout";

const TestChildren = () => <div>test children</div>;

const makeSut = () =>
  render(
    <ChakraProvider>
      <Layout>
        <TestChildren />
      </Layout>
    </ChakraProvider>
  );

expect.extend(toHaveNoViolations);

describe("Layout", () => {
  it("should have no accessibility violations", async () => {
    const { container } = makeSut();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders all layout components", () => {
    const { getByText, getByLabelText, queryAllByRole, getAllByRole } =
      makeSut();

    // homepage button
    expect(getByLabelText("home-button")).toBeInTheDocument();

    // language selector
    const menuitems = getAllByRole("menuitem", { hidden: true });
    expect(menuitems.length).toBe(3);

    // searchbar
    const buttons = queryAllByRole("button");
    expect(
      buttons.find((button: HTMLElement) => button.id === "search-button")
    ).toBeTruthy();

    // fake page content
    expect(getByText("test children")).toBeInTheDocument();
  });
});
