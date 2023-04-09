import * as React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import { useI18next } from "gatsby-plugin-react-i18next";
import Layout from "../components/layout/layout";

const NotFoundPage: React.FC<PageProps> = () => {
  const { t } = useI18next();
  return (
    <Layout>
      <Flex
        direction="column"
        maxW={{ lg: "60%" }}
        mx="auto"
        alignItems="center"
      >
        <Heading m={3}>404 - {t("page-not-found")}</Heading>
        <StaticImage src="../images/404-team-rocket.jpg" alt="team rocket" />
        <Box m={3}>
          <Text fontSize="xl">{t("sorry-something-went-wrong")}</Text>
        </Box>
      </Flex>
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Pokédex: 404</title>;

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
