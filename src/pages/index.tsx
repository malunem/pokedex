import { graphql, HeadProps } from "gatsby";
import * as React from "react";
import { useState, useEffect } from "react";
import type { PageProps } from "gatsby";
import { Trans } from "gatsby-plugin-react-i18next";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import PokemonCard from "../components/pokemon-card";
import Layout from "../components/layout";
import { PokemonNode } from "../utils/types";

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const doclistStyles = {
  paddingLeft: 0,
};

type IndexPageProps = PageProps<Queries.IndexPageQuery>;

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const [pokemons, setPokemons] = useState<PokemonNode>();

  useEffect(() => {
    console.log(data.pokemons.nodes);
    setPokemons(data.pokemons.nodes);
  }, []);

  return (
    <Layout>
      <>
        <h1 style={headingStyles}>
          <Trans>Hello</Trans>
        </h1>
        <ul style={doclistStyles}>
          {pokemons?.map((pokemon) => (
            <PokemonCard pokemon={pokemon} />
          ))}
        </ul>
      </>
    </Layout>
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
