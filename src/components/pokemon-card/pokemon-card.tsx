import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby-plugin-react-i18next";
import React from "react";
import { PokemonNode } from "../../../@types/globals";

export interface PokemonCardProps {
  pokemon: PokemonNode[0];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { name, transName } = pokemon;
  const { number } = pokemon.pokemonBasic ?? {};
  const { gatsbyImageData } =
    pokemon.pokemonBasic?.localFile?.childImageSharp ?? {};
  return (
    <Link id={name} to={`/pokemon/${name}`}>
      <p>
        {transName} - {number ?? ""}
      </p>
      {
        // TODO: create a placeholder plugin for missing images
        gatsbyImageData && (
          <GatsbyImage
            image={gatsbyImageData}
            alt={`${name} sprite`}
            loading="lazy"
            className="pokemon-sprite"
          />
        )
      }
    </Link>
  );
};

export default PokemonCard;
