import { graphql, PageProps } from "gatsby";
import React from "react";
import { PokemonDetailsItem } from "../../utils/pokemon-details";

type PokemonPageProps = PageProps & {
  params: { name: string };
  location: { state: PokemonDetailsItem };
};

const PokemonPage: React.FC<PokemonPageProps> = ({ params, location }) => {
  const { name } = params;
  const {
    name: translatedName,
    description,
    number,
    genus,
    imageUrl,
  } = location.state;

  return (
    <>
      <h1>{translatedName}</h1>
      <p>{description}</p>
      <p>{number}</p>
      <p>{genus}</p>
      <img src={imageUrl ?? ""} alt={`${name} sprite`} />;
    </>
  );
};

export default PokemonPage;

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
