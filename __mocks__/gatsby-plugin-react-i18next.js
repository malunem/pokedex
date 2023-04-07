const React = require("react");

const gatsbyPluginReactI18next = jest.requireActual(
  "gatsby-plugin-react-i18next"
);

const mockUseI18next = () => {
  return {
    languages: ["en", "it", "fr"],
    originalPath: "/",
    language: "en",
    t: jest.fn().mockImplementation((key) => key),
  };
};

const mockLink = ({
  activeClassName,
  activeStyle,
  getProps,
  innerRef,
  partiallyActive,
  ref,
  replace,
  to,
  language,
  ...rest
}) =>
  React.createElement("a", {
    ...rest,
    href: language ? `/${language}${to}` : to,
    hrefLang: language,
  });

module.exports = {
  ...gatsbyPluginReactI18next,
  useI18next: jest.fn().mockImplementation(mockUseI18next),
  Link: jest.fn().mockImplementation(mockLink),
};
