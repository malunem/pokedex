/* eslint-disable @typescript-eslint/no-var-requires */

const { PokemonClient } = require("pokenode-ts");

const GAME_VERSIONS = ["x", "y"];

const formatPokemonID = (id) => id.toString().padStart(3, "0");

exports.callApiWithRetry = async (apiCall, pokemonName, retries = 0) => {
  try {
    const pokemonApi = new PokemonClient();

    let response;
    switch (apiCall) {
      case "pokemonSpecies":
        response = await pokemonApi.listPokemonSpecies(0, 200);
        break;
      case "pokemonDetails":
        if (pokemonName === undefined)
          throw new Error("pokemonName not provided");
        response = pokemonApi.getPokemonByName(pokemonName);
        break;
      case "pokemonByName":
        response = await pokemonApi.getPokemonSpeciesByName(pokemonName);
        break;
      default:
        throw new Error(`${apiCall} not supported`);
    }
    // resolve(response);
    const data = await response;
    return data;
  } catch (error) {
    // reject();
    const delay = (retries + 1) * 100;
    console.log(
      `Error fetching data (${error.message}). Retrying in ${delay}ms...`
    );
    return exports.callApiWithRetry(apiCall, pokemonName, retries + 1);
  }
};

exports.getPokemonDetails = async (pokemonSpecies, languages) => {
  const result = await pokemonSpecies.reduce(async (pokemons, pokemon) => {
    const pokemonList = await pokemons;
    const {
      color,
      names,
      id,
      genera,
      flavor_text_entries: flavorTextEntries,
    } = await exports.callApiWithRetry("pokemonByName", pokemon.name);

    const fetchedPokemon = await exports.callApiWithRetry(
      "pokemonDetails",
      pokemon.name
    );
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
      color: color.name,
    };
    return pokemonList;
  }, Promise.resolve({}));

  return result;
};
