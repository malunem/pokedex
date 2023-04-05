import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Layout from "./layout";

const TestChildren = () => <div>test children</div>;

expect.extend(toHaveNoViolations);

describe("Layout", () => {
  it("should have no accessibility violations", async () => {
    const { container } = render(
      <Layout>
        <TestChildren />
      </Layout>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders all layout components", () => {
    const { getByText, getByRole } = render(
      <Layout>
        <TestChildren />
      </Layout>
    );
    expect(getByText("Home")).toBeInTheDocument();
    expect(getByRole("list")).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();
    expect(getByText("test children")).toBeInTheDocument();
  });
});
