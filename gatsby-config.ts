import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `pokedex`,
    siteUrl: `https://www.yourdomain.tld`, // TODO: update url
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-plugin-typescript",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: ["en", `it`, `fr`],
        defaultLanguage: `en`,
        siteUrl: `https://example.com`, // TODO: update url
        trailingSlash: "always",
        i18nextOptions: {
          interpolation: {
            escapeValue: false,
          },
          supportedLngs: ["en", "it", "fr"],
          keySeparator: false,
          nsSeparator: false,
        },
        pages: [
          {
            matchPath: "/:lang?/pokemon/:name",
            getLanguageFromPath: true,
          },
        ],
      },
    },
    {
      resolve: "pokemon-plugin",
      options: {
        path: `${__dirname}/plugins/pokemon-plugin`,
        name: `pokemon`,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          // placeholder: `blurred`,
        },
      },
    },
    `gatsby-transformer-sharp`,
  ],
};

export default config;
