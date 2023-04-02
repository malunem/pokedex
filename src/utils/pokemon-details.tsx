import { NamedAPIResource, PokemonClient } from "pokenode-ts";
// import { PokemonSpecies } from "./api.d";

export type PokemonDetailsList = Record<string, PokemonDetailsItem>;

export interface PokemonDetailsItem {
  number: string | undefined;
  name: string | undefined;
  genus: string | undefined;
  description: string | undefined;
  imageUrl: string | null | undefined;
}

const formatPokemonID = (id: number) => id.toString().padStart(3, "0");

export const getPokemonDetails = async (
  pokemonSpecies: NamedAPIResource[] = [],
  language = "en" // TODO: setup const default language
): Promise<PokemonDetailsList> => {
  const pokemonApi = new PokemonClient();

  const result = await pokemonSpecies.reduce(
    async (pokemons: Promise<PokemonDetailsList>, pokemon) => {
      const pokemonObj = await pokemons;
      const {
        names,
        id,
        genera,
        flavor_text_entries: flavorTextEntries,
      } = await pokemonApi.getPokemonSpeciesByName(pokemon.name);

      const name = names.find(
        (translatedName) => translatedName.language.name === language
      )?.name;
      const number = formatPokemonID(id);
      const genus = genera.find(
        (translatedGenus) => translatedGenus.language.name === language
      )?.genus;
      const description = flavorTextEntries.find(
        (translatedText) => translatedText.language.name === language
      )?.flavor_text;

      const fetchedPokemon = await pokemonApi.getPokemonByName(pokemon.name);
      const imageUrl = await fetchedPokemon.sprites.other?.home.front_default;

      pokemonObj[pokemon.name] = { name, number, genus, description, imageUrl };
      return pokemonObj;
    },
    Promise.resolve({} as PokemonDetailsList)
  );

  return result;
};
