import { graphql, HeadProps } from "gatsby";
import * as React from "react";
import { useState, useEffect } from "react";
import type { PageProps } from "gatsby";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import { SimpleGrid } from "@chakra-ui/react";
import { useI18next } from "gatsby-plugin-react-i18next";
import PokemonCard from "../components/pokemon-card/pokemon-card";
import { PokemonNode } from "../../@types/globals";
import Layout from "../components/layout/layout";
import SEO from "../components/seo";

type IndexPageProps = PageProps<Queries.IndexPageQuery>;

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const { t } = useI18next();
  const title = t("home-page");
  const [pokemons, setPokemons] = useState<PokemonNode>();
  useEffect(() => {
    setPokemons(data.pokemons.nodes);
  }, []);

  return (
    <Layout>
      <SEO title={title} />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5 }} spacing={3}>
        {pokemons?.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </SimpleGrid>
    </Layout>
  );
};

export default IndexPage;

type DataProps = object;

export const Head = ({
  pageContext,
}: HeadProps<DataProps, PageContext>): JSX.Element => (
  <html lang={pageContext.language} />
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
