import * as React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";

const NotFoundPage: React.FC<PageProps> = () => (
  <Flex direction="column" maxW={{ lg: "60%" }} mx="auto" alignItems="center">
    <Heading m={3}>404 - Page not found</Heading>
    <StaticImage
      src="../images/404-team-rocket.jpg"
      alt="team rocket flying away"
     />
    <Box m={3}>
      <Text fontSize="xl">Sorry! Something went wrong.</Text>
    </Box>
  </Flex>
);

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;

export const query = graphql`
  query ErrorPage($language: String!) {
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
