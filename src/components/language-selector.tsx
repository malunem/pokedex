import { Link, useI18next } from "gatsby-plugin-react-i18next";
import React from "react";

const LanguageSelector = () => {
  const { languages, originalPath } = useI18next();
  return (
      <ul className="languages">
        {languages.map((lng) => (
          <li key={lng}>
            <Link to={originalPath} language={lng}>
              {lng}
            </Link>
          </li>
        ))}
      </ul>
  );
};

export default LanguageSelector;
