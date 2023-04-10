import {
  Badge,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text
} from "@chakra-ui/react";
import { motion, useAnimationControls } from "framer-motion";
import { graphql, HeadProps, PageProps } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import React, { useEffect } from "react";
import { v1 as uniqueId } from "uuid";
import Layout from "../components/layout/layout";
import SEO from "../components/seo";

type PokemonPageProps = PageProps<Queries.PokemonPageQuery>;

const PokemonPage: React.FC<PokemonPageProps> = ({ data }) => {
  const { name, transName, transDescriptions, transGenus, pokemonBasic } =
    data.pokemon ?? {};
  const { number, localFile, color } = pokemonBasic ?? {};
  const { gatsbyImageData } = localFile?.childImageSharp ?? {};

  const pokeballAnimation = useAnimationControls();
  const pokemonAnimation = useAnimationControls();

  const animationSequence = async () => {
    await pokeballAnimation.start({
      rotate: [0, 10, 0],
      transition: {
        delay: 0.2,
        repeat: 10,
        duration: 0.2
      }
    });
    await pokeballAnimation.mount()
    await pokeballAnimation.start({ opacity: 0, scale: 0 });
    await pokemonAnimation.mount()
    return await pokemonAnimation.start({ opacity: 1, scale: [1, 1.5, 1] });
  };

  useEffect(() => {
    animationSequence();
  }, []);

  return (
    <Layout>
      <SimpleGrid
        id="pokemon-image-container"
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 2, lg: 10 }}
        minH="50vh"
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          marginLeft={{ lg: "100px" }}
          id="name-pic-container"
          minW="30vw"
        >
          <Heading
            as="h1"
            id={name}
            className="pokemon-name"
            fontSize="5vh"
            textAlign="center"
          >
            {transName}
          </Heading>
          <Flex w="100%" justifyContent="center" alignItems="center">
            <Box
              borderRadius="50%"
              w="fit-content"
              bgColor={`${color}.600`}
              px="0.5vw"
            >
              <Text
                fontSize="2vh"
                fontWeight="semibold"
                color="white"
                className="pokemon-number"
              >
                {number}
              </Text>
            </Box>
          </Flex>
          {gatsbyImageData && (
            <Box
              _hover={{ transform: "scale(1.05)" }}
              position="relative"
              id="pokemon-image-container"
            >
              <Box
                as={motion.span}
                zIndex={2}
                position="absolute"
                width="40%"
                bottom="30%"
                right="30%"
                animate={pokeballAnimation}
              >
                <StaticImage
                  src="../../static/pokeball.png"
                  alt="pokéball"
                  objectFit="contain"
                />
              </Box>
              <Box
                as={motion.div}
                animate={pokemonAnimation}
                initial={{ opacity: 0 }}
              >
                <GatsbyImage
                  className="pokemon-sprite"
                  image={gatsbyImageData}
                  alt={`${name} sprite`}
                  objectFit="scale-down"
                />
              </Box>
            </Box>
          )}
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          h={{ base: "unset", lg: "100%" }}
          marginEnd={{ lg: "100px" }}
          marginTop={{ base: 10, lg: "unset" }}
          minW="30vw"
        >
          <Stack direction="column">
            <Badge fontSize="2vh" className="pokemon-genus" colorScheme="blue">
              {transGenus}
            </Badge>
            {transDescriptions?.map((description) => (
              <Text
                key={`description-${uniqueId()}`}
                className="pokemon-description"
                m={10}
                fontSize="3vh"
              >
                {description?.flavor_text ?? ""}
              </Text>
            ))}
          </Stack>
        </Flex>
      </SimpleGrid>
    </Layout>
  );
};
export default PokemonPage;

type DataProps = Queries.PokemonPageQuery;

export const Head = ({
  data,
  pageContext
}: HeadProps<DataProps, PageContext>): JSX.Element => {
  const { transName } = data.pokemon ?? {};
  return (
    <>
      <SEO title={transName} />;
      <html lang={pageContext.language} />
    </>
  );
};

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
        color
        localFile {
          childImageSharp {
            gatsbyImageData(width: 512)
          }
        }
      }
    }
  }
`;
