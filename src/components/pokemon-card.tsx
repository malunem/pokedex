import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby-plugin-react-i18next";
import React from "react";
import { PokemonNode } from "../utils/types";

interface PokemonCardProps {
  pokemon: PokemonNode[0];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
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
};

export default PokemonCard;