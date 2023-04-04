const React = require("react");
const gatsbyPluginImage = jest.requireActual("gatsby-plugin-image");
const mockImage = ({ path, imgClassName, ...props }) =>
  React.createElement("img", {
    ...props,
    src: path,
    className: imgClassName,
  });

module.exports = {
  ...gatsbyPluginImage,
  GatsbyImage: jest.fn().mockImplementation(mockImage),
};
