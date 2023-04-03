import { graphql } from "gatsby";
import * as React from "react";
import { useState, useEffect } from "react";
import type { PageProps, HeadProps } from "gatsby";
import { Link, Trans } from "gatsby-plugin-react-i18next";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import { GatsbyImage } from "gatsby-plugin-image";
import LanguageSelector from "../components/language-selector";

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};

const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
};
const doclistStyles = {
  paddingLeft: 0,
};

type IndexPageProps = PageProps<Queries.IndexPageQuery>;
type PokemonNode = Queries.IndexPageQuery["pokemons"]["nodes"];

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const [pokemons, setPokemons] = useState<PokemonNode>();

  useEffect(() => {
    console.log(data.pokemons.nodes);
    setPokemons(data.pokemons.nodes);
  }, []);

  if (!pokemons) {
    // TODO: setup loading component
    return <div>Loading...</div>;
  }

  return (
    <main style={pageStyles}>
      <LanguageSelector siteTitle="Pokedex" />
      <h1 style={headingStyles}>
        <Trans>Hello</Trans>
      </h1>
      <p style={paragraphStyles} />
      <ul style={doclistStyles}>
        {pokemons.map((pokemon) => {
          const { name, transName } = pokemon;
          const { number } = pokemon.pokemonBasic ?? {};
          const { gatsbyImageData } =
            pokemon.pokemonBasic?.localFile?.childImageSharp ?? {};
          return (
            <li key={name}>
              <Link to={`/pokemon/${name}`}>
                <p>
                  {transName} - {number ?? ""}
                </p>
              </Link>
              {
                // TODO: create a placeholder plugin for missing images
                gatsbyImageData && (
                  <GatsbyImage
                    image={gatsbyImageData}
                    alt={`${name} sprite`}
                    loading="lazy"
                  />
                )
              }
            </li>
          );
        })}
      </ul>
      <ul style={listStyles} />
    </main>
  );
};

export default IndexPage;

type DataProps = object;

export const Head = ({
  pageContext,
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
