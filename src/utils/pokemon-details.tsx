import { NamedAPIResource, PokemonClient,  } from "pokenode-ts";
// import { PokemonSpecies } from "./api.d";

export type PokemonDetails = Record<
  string,
  {
    number: number | undefined;
    name: string | undefined;
    genus: string | undefined;
    description: string | undefined;
    imageUrl: string | null | undefined;
  }
>;

export const getPokemonDetails = async (
  pokemonSpecies: NamedAPIResource[] = [],
  language = "en" // TODO: setup const default language
): Promise<PokemonDetails> => {
  console.log(
    `getPokemonDetails${JSON.stringify({ language, pokemonSpecies })}`
  );
  const pokemonApi = new PokemonClient();

  const result = await pokemonSpecies.reduce(
    async (pokemons: Promise<PokemonDetails>, pokemon) => {
      const pokemonObj = await pokemons;
      const fetchedPokemonSpecies = await pokemonApi.getPokemonSpeciesByName(
        pokemon.name
      );
      const awaitedPokemonSpecies = await fetchedPokemonSpecies;
      console.log(awaitedPokemonSpecies);
      const name = await fetchedPokemonSpecies.names.find(
        (translatedName) => translatedName.language.name === language
      )?.name;
      const number = await fetchedPokemonSpecies.id;
      const genus = await fetchedPokemonSpecies.genera.find(
        (translatedGenus) => translatedGenus.language.name === language
      )?.genus;
      const description = await fetchedPokemonSpecies.flavor_text_entries.find(
        (translatedText) => translatedText.language.name === language
      )?.flavor_text;

      const fetchedPokemon = await pokemonApi.getPokemonByName(pokemon.name);
      const imageUrl = await fetchedPokemon.sprites.other?.home.front_default;

      pokemonObj[pokemon.name] = { name, number, genus, description, imageUrl };
      return pokemonObj;
    },
    Promise.resolve({} as PokemonDetails)
  );

  console.log(`getPokemonDetails${JSON.stringify({ result })}`);

  return result;
};
