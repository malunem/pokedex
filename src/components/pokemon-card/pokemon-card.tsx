import { Card, CardBody, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
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
      className="pokemon-basic"
      id={name}
      direction={{ base: "row", lg: "column" }}
      maxH={{ base: "150px", lg: "40vh"}}
      maxW={{ base: "100vw", lg: "33vw", xl: "20vw" }}
      bgColor={`${color}.200`}
      onClick={() => navigate(`/pokemon/${name}`)}
      borderRadius={{'2xl': '5%'}}
      boxShadow="md"
      _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
    >
      <Stack>
        <CardBody>
          <Heading fontSize={{ base: "2xl", lg: "5vh" }} fontWeight="semibold">
            {transName}
          </Heading>
          <Text fontSize="2vh">{number ?? ""}</Text>
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
