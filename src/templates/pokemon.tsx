import { graphql, HeadProps, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import React from "react";
import Layout from "../components/layout/layout";

type PokemonPageProps = PageProps<Queries.PokemonPageQuery>;

const PokemonPage: React.FC<PokemonPageProps> = ({ data }) => {
  const { name, transName, transDescriptions, transGenus, pokemonBasic } =
    data.pokemon ?? {};
  const { number, localFile } = pokemonBasic ?? {};
  const { gatsbyImageData } = localFile?.childImageSharp ?? {};
  return (
    <Layout>
      <h1 id={name} className="pokemon-name">
        {transName}
      </h1>
      <p className="pokemon-number">{number}</p>
      <p className="pokemon-description">
        {transDescriptions?.[0]?.flavor_text ?? "no description"}
      </p>
      <p className="pokemon-genus">{transGenus}</p>
      {gatsbyImageData && (
        <GatsbyImage
          className="pokemon-sprite"
          image={gatsbyImageData}
          alt={`${name} sprite`}
        />
      )}
    </Layout>
  );
};
export default PokemonPage;

type DataProps = object;

export const Head = ({
  pageContext,
}: HeadProps<DataProps, PageContext>): JSX.Element => (
  <>
    <html lang={pageContext.language} />
    <title>Pokemon Details</title>
  </>
);

export const query = graphql`
  query PokemonPage($language: String!, $pokemonName: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    pokemon: pokemonDetails(
      name: { eq: $pokemonName }
      language: { eq: $language }
    ) {
      id
      name
      transName
      transGenus
      transDescriptions {
        flavor_text
      }
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
`;
