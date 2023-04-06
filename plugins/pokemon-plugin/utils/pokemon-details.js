/* eslint-disable @typescript-eslint/no-var-requires */

const { PokemonClient } = require("pokenode-ts");

const GAME_VERSIONS = ["x", "y"];

const formatPokemonID = (id) => id.toString().padStart(3, "0");

exports.getPokemonDetails = async (
  pokemonSpecies,
  languages // TODO: setup const default language
) => {
  const pokemonApi = new PokemonClient();

  const result = await pokemonSpecies.reduce(async (pokemons, pokemon) => {
    const pokemonList = await pokemons;
    const {
      color,
      names,
      id,
      genera,
      flavor_text_entries: flavorTextEntries,
    } = await pokemonApi.getPokemonSpeciesByName(pokemon.name);

    const fetchedPokemon = await pokemonApi.getPokemonByName(pokemon.name);
    const imageUrl = await fetchedPokemon.sprites.other?.home.front_default;

    const filteredNames = names.filter((translatedName) =>
      languages.includes(translatedName.language.name)
    );
    const number = formatPokemonID(id);
    const filteredGenus = genera.filter((translatedGenus) =>
      languages.includes(translatedGenus.language.name)
    );
    const filteredDescriptions = flavorTextEntries.filter(
      (translatedText) =>
        languages.includes(translatedText.language.name) &&
        GAME_VERSIONS.includes(translatedText.version.name)
    );

    pokemonList[pokemon.name] = {
      name: pokemon.name,
      names: filteredNames,
      number,
      genera: filteredGenus,
      descriptions: filteredDescriptions,
      imageUrl,
      color: color.name
    };
    return pokemonList;
  }, Promise.resolve({}));

  return result;
};
