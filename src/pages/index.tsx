import { graphql } from "gatsby";
import * as React from "react";
import { useState, useEffect } from "react";
import type { PageProps, HeadProps } from "gatsby";
import { Trans, useI18next } from "gatsby-plugin-react-i18next";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import { NamedAPIResource, PokemonClient } from "pokenode-ts";
import LanguageSelector from "../components/language-selector";
import { getPokemonDetails, PokemonDetails } from "../utils/pokemon-details";

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

const IndexPage: React.FC<PageProps> = () => {
  const pokemonApi = new PokemonClient();
  const [pokemonSpecies, setPokemonSpecies] = useState<NamedAPIResource[]>();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>();
  const i18next = useI18next();

  // TODO: make this data persistent
  useEffect(() => {
    pokemonApi
      .listPokemonSpecies(0, 3)
      .then((data) => setPokemonSpecies(data.results))
      .catch((error) => console.error(error));
  }, [i18next.language]);

  useEffect(() => {
    getPokemonDetails(pokemonSpecies, i18next.language).then((data) =>
      setPokemonDetails(data)
    );
  }, [pokemonSpecies]);

  if (!pokemonSpecies || pokemonSpecies.length === 0 || !pokemonDetails) {
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
        {pokemonSpecies.map((pokemon) => {
          const { name, description, number, genus, imageUrl } =
            pokemonDetails[pokemon.name] ?? {};
          return (
            <li key={pokemon.name}>
              <a href={pokemon.url}>{pokemon.name}</a>
              <p>{name}</p>
              <p>{description}</p>
              <p>{number}</p>
              <p>{genus}</p>
              <img src={imageUrl ?? ""} alt={`${pokemon.name} sprite`} />
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
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
