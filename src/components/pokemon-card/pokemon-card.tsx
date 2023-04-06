import {
  Card,
  CardBody,
  Heading,
  Spacer,
  Stack,
  Text
} from "@chakra-ui/react";
import { navigate } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { PokemonNode } from "../../../@types/globals";

export interface PokemonCardProps {
  pokemon: PokemonNode[0];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { name, transName } = pokemon;
  const { number, color } = pokemon.pokemonBasic ?? {};
  const { gatsbyImageData } =
    pokemon.pokemonBasic?.localFile?.childImageSharp ?? {};

  return (
    <Card
      id={name}
      direction={{ base: "row", lg: "column" }}
      h={{ base: "150px", lg: "350px" }}
      maxW={{ base: "100%", lg: "350px" }}
      bgColor={`${color}.200`}
      onClick={() => navigate(`/pokemon/${name}`)}
      boxShadow="md"
      _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
    >
      <Stack>
        <CardBody>
          <Heading size={{ base: "2xl", lg: "xl" }} fontWeight="semibold">
            {transName}
          </Heading>
          <Text>{number ?? ""}</Text>
        </CardBody>
      </Stack>

      <Spacer />
      {gatsbyImageData && (
        <GatsbyImage
          image={gatsbyImageData}
          alt={name}
          loading="lazy"
          className="pokemon-sprite"
          backgroundColor="transparent"
          objectFit="contain"
          objectPosition="right center"
        />
      )}
    </Card>
  );
};

export default PokemonCard;
