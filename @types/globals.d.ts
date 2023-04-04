export type PokemonNode = Queries.IndexPageQuery["pokemons"]["nodes"];

export const SUPPORTED_LANGUAGES = ["en", "it", "fr"];

interface Node {
  name: string;
  transName: string;
  language: string;
}

type Store =
  | {
      id: number;
      node: Node;
    }[]
  | undefined;

type Index =
  | {
      name: string;
      values: { search: (query: string) => number[] };
    }[]
  | undefined;

type Results = number[];

declare global {
  interface Window {
    __FLEXSEARCH__:
      | {
          [key in SUPPORTED_LANGUAGES]: {
            index: Index; // flexsearch index instance
            store: Store; // object where the key is a gatsby node ID and value is a collection of field values
          };
        }
      | undefined;
  }
}
