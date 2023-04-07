import {
  Badge,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { graphql, HeadProps, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import React from "react";
import { v1 as uniqueId } from "uuid";
import Layout from "../components/layout/layout";
import SEO from "../components/seo";

type PokemonPageProps = PageProps<Queries.PokemonPageQuery>;

const PokemonPage: React.FC<PokemonPageProps> = ({ data }) => {
  const { name, transName, transDescriptions, transGenus, pokemonBasic } =
    data.pokemon ?? {};
  const { number, localFile, color } = pokemonBasic ?? {};
  const { gatsbyImageData } = localFile?.childImageSharp ?? {};

  return (
    <Layout>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 2, lg: 10 }}>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          h={{ base: "unset", lg: "100%" }}
          marginLeft={{ lg: "100px" }}
        >
          <Heading
            as="h1"
            id={name}
            className="pokemon-name"
            fontSize="7xl"
            textAlign="center"
          >
            {transName}
          </Heading>
          <Flex w="100%" justifyContent="center" alignItems="center">
            <Box borderRadius="50%" bgColor={`${color}.600`} px={2}>
              <Text
                fontSize="md"
                fontWeight="semibold"
                color="white"
                className="pokemon-number"
              >
                {number}
              </Text>
            </Box>
          </Flex>
          {gatsbyImageData && (
            <Box _hover={{ transform: "scale(1.05)" }}>
              <GatsbyImage
                className="pokemon-sprite"
                image={gatsbyImageData}
                alt={`${name} sprite`}
              />
            </Box>
          )}
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          h={{ base: "unset", lg: "100%" }}
          marginEnd={{ lg: "100px" }}
          marginTop={{ base: 10, lg: "unset" }}
        >
          <Stack direction="column">
            <Badge fontSize="md" className="pokemon-genus" colorScheme="blue">
              {transGenus}
            </Badge>
            {transDescriptions?.map((description) => (
              <Text
                key={`description-${uniqueId()}`}
                className="pokemon-description"
                m={10}
                fontSize="xl"
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
  pageContext,
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
            gatsbyImageData
          }
        }
      }
    }
  }
`;
