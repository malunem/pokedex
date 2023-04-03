import { graphql, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

type PokemonPageProps = PageProps<Queries.PokemonPageQuery>

const PokemonPage: React.FC<PokemonPageProps> = ({ data }) => {
  const { name, transName, transDescriptions, transGenus, pokemonBasic } =
    data.pokemon ?? {};
  const { number, localFile } = pokemonBasic ?? {};
  const { gatsbyImageData } = localFile?.childImageSharp ?? {};
  return (
    <p>
      <h1>{transName}</h1>
      <p>{number}</p>
      <p>{transDescriptions?.[0]?.flavor_text ?? "no description"}</p>
      <p>{transGenus}</p>
      {gatsbyImageData && (
        <GatsbyImage
          image={gatsbyImageData}
          alt={`${name} sprite`}
         />
      )}
    </p>
  );
};
export default PokemonPage;

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
