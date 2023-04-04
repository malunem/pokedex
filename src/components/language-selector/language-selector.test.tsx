import React from "react";
import { render, screen } from "@testing-library/react";
import { useI18next } from "gatsby-plugin-react-i18next";
import { axe, toHaveNoViolations } from "jest-axe";
import LanguageSelector from "./language-selector";

const { languages } = useI18next();

expect.extend(toHaveNoViolations);

describe("LanguageSelector", () => {
  test("should have no accessibility violations", async () => {
    const { container } = render(<LanguageSelector />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test("renders all languages", () => {
    render(<LanguageSelector />);

    const languageLinks = screen.getAllByRole("listitem");
    expect(languageLinks).toHaveLength(languages.length);

    languages.forEach((language, i) => {
      expect(languageLinks[i]).toHaveAttribute("id", language);
      expect(languageLinks[i].querySelector("a")).toHaveAttribute(
        "href",
        `/${language}/`
      );
      expect(languageLinks[i].querySelector("a")).toHaveTextContent(language);
    });
  });
});
