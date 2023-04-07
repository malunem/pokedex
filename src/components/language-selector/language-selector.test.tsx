import React from "react";
import { render } from "@testing-library/react";
import { useI18next } from "gatsby-plugin-react-i18next";
import { axe, toHaveNoViolations } from "jest-axe";
import LanguageSelector from "./language-selector";

const { languages } = useI18next();

expect.extend(toHaveNoViolations);

describe("LanguageSelector", () => {
  it("should have no accessibility violations", async () => {
    const { container } = render(<LanguageSelector />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders all languages", () => {
    const { getAllByText } = render(<LanguageSelector />);

    languages.forEach((language) => {
      const elements = getAllByText(language.toUpperCase());

      // expect to find 2 elements if it's the current language, 1 otherwise
      expect(elements.length).toBeGreaterThanOrEqual(1);
      expect(elements.length).toBeLessThanOrEqual(2);
    });
  });
});
