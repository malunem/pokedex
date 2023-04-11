import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Pokédex`,
    description: `Browse Pokémons and discover their peculiarities`,
    siteUrl: `https://pokedex71596.gatsbyjs.io`,
    image: `/pokeball.png`,
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
        siteUrl: "https://pokedex71596.gatsbyjs.io",
        trailingSlash: "always",
        generateDefaultLanguagePage: true,
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
            matchPath: "/:lang/pokemon/:name",
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
          backgroundColor: `transparent`,
          placeholder: `blurred`,
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-flexsearch",
      options: {
        name: "pokemon-search",
        languages: ["en", "it", "fr"],
        type: "PokemonDetails",
        fields: [
          {
            name: "name",
            indexed: false,
            resolver: "name",
            store: true,
          },
          {
            name: "transName",
            indexed: true,
            resolver: "transName",
            store: true,
          },
          {
            name: "language",
            indexed: false,
            resolver: "language",
            store: true,
          },
        ],
      },
    },
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        resetCSS: true,
        isUsingColorMode: true,
        isBaseProvider: false,
      },
    },
  ],
};

export default config;
