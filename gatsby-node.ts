import path from "path";

export const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query DynamicPokemonPage {
      allPokemonBasic {
        edges {
          node {
            name
            number
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `);

  result.data?.allPokemonBasic.edges.forEach(({ node }) => {
    console.log(node);
    createPage({
      path: `/pokemon/${node.name}`,
      component: path.resolve(`./src/templates/pokemon.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        pokemonName: node.name,
      },
    });
  });
};
