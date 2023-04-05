import { Link, useI18next } from "gatsby-plugin-react-i18next";
import React from "react";

export interface LanguageSelectorProps {
  languages: string[];
}

const LanguageSelector = () => {
  const { languages, originalPath } = useI18next();
  return (
    <ul id="language-selector" aria-label="languages">
      {languages.map((lng) => (
        <li key={lng}>
          <Link id={lng} to={originalPath} language={lng}>
            {lng}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LanguageSelector;
