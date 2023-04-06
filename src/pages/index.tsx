import { graphql, HeadProps } from "gatsby";
import * as React from "react";
import { useState, useEffect } from "react";
import type { PageProps } from "gatsby";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import { SimpleGrid } from "@chakra-ui/react";
import PokemonCard from "../components/pokemon-card/pokemon-card";
import { PokemonNode } from "../../@types/globals";

type IndexPageProps = PageProps<Queries.IndexPageQuery>;

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const [pokemons, setPokemons] = useState<PokemonNode>();
  useEffect(() => {
    setPokemons(data.pokemons.nodes);
  }, []);

  return (
    <SimpleGrid columns={{ base: 1, lg: 5 }} spacing={3}>
      {pokemons?.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
        />
      ))}
    </SimpleGrid>
  );
};

export default IndexPage;

type DataProps = object;

export const Head = ({
  pageContext
}: HeadProps<DataProps, PageContext>): JSX.Element => (
  <>
    <html lang={pageContext.language} />
    <title>Home Page</title>
  </>
);

export const query = graphql`
  query IndexPage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    pokemons: allPokemonDetails(filter: { language: { eq: $language } }) {
      nodes {
        name
        transName
        pokemonBasic {
          number
          color
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`;
