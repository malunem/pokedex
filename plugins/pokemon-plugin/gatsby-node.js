/* eslint-disable @typescript-eslint/no-var-requires */

const { createRemoteFileNode } = require("gatsby-source-filesystem");
const {
  getPokemonDetails,
  callApiWithRetry,
} = require("./utils/pokemon-details.js");

const POKEMON_BASIC_NODE_TYPE = "PokemonBasic";
const POKEMON_DETAILS_NODE_TYPE = "PokemonDetails";
const SUPPORTED_LANGUAGES = ["en", "it", "fr"];

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions;
  const pokemonSpecies = await callApiWithRetry("pokemonSpecies");
  const pokemons = await getPokemonDetails(
    pokemonSpecies.results,
    SUPPORTED_LANGUAGES
  );
  const data = {
    pokemonSpecies: pokemonSpecies.results,
    pokemons,
  };

  SUPPORTED_LANGUAGES.forEach((language) => {
    data.pokemonSpecies.forEach((pokemonSpeciesItem) => {
      const { name } = pokemonSpeciesItem;
      const pokemon = data.pokemons[name];
      createNode({
        id: createNodeId(`${POKEMON_DETAILS_NODE_TYPE}-${language}-${name}`),
        name,
        language,
        transName: pokemon.names.find(
          (nameItem) => nameItem.language.name === language
        ).name,
        transDescriptions: pokemon.descriptions.filter(
          (description) => description.language.name === language
        ),
        transGenus: pokemon.genera.find(
          (genera) => genera.language.name === language
        ).genus,
        internal: {
          type: POKEMON_DETAILS_NODE_TYPE,
          contentDigest: createContentDigest(pokemonSpeciesItem),
        },
      });
    });
  });

  // loop through data and create Gatsby nodes
  data.pokemonSpecies.forEach((pokemonSpeciesItem) => {
    const { name } = pokemonSpeciesItem;
    const { number, imageUrl, color } = data.pokemons[pokemonSpeciesItem.name];
    createNode({
      id: createNodeId(`${POKEMON_BASIC_NODE_TYPE}-${name}`),
      name,
      number,
      imageUrl,
      color,
      internal: {
        type: POKEMON_BASIC_NODE_TYPE,
        contentDigest: createContentDigest(pokemonSpeciesItem),
      },
    });
  });
};

// called each time a node is created
exports.onCreateNode = async ({
  node, // the node that was just created
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
  if (node.internal.type === POKEMON_BASIC_NODE_TYPE) {
    // the url of the remote image to generate a node for
    const fileNode = await createRemoteFileNode({
      url: node.imageUrl,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    });

    createNodeField({ node, name: "localFile", value: fileNode.id });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type PokemonBasic implements Node {
      name: String!
      localFile: File @link(from: "fields.localFile")
      pokemonDetails: [PokemonDetails] @link(from: "name", by: "name")
    }
    type PokemonDetails implements Node {
      name: String!
      pokemonBasic: PokemonBasic @link(from: "name", by: "name")
    }
  `);
};
