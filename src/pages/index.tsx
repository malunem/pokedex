import { graphql, HeadProps } from "gatsby";
import * as React from "react";
import { useState, useEffect, Suspense } from "react";
import type { PageProps } from "gatsby";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import { SimpleGrid, Spinner } from "@chakra-ui/react";
import { useI18next } from "gatsby-plugin-react-i18next";
import { PokemonNode } from "../../@types/globals";
import Layout from "../components/layout/layout";
import SEO from "../components/seo";

const LazyPokemonCard = React.lazy(
  () => import("../components/pokemon-card/pokemon-card")
);

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
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 5 }}
        spacing={{ base: 3, "2xl": "1vw" }}
      >
        {pokemons?.map((pokemon) => (
          <Suspense fallback={<Spinner />}>
            <LazyPokemonCard key={pokemon.name} pokemon={pokemon} />
          </Suspense>
        ))}
      </SimpleGrid>
    </Layout>
  );
};

export default IndexPage;

type DataProps = object;

export const Head = ({
  pageContext
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
              gatsbyImageData(width: 512)
            }
          }
        }
      }
    }
  }
`;
