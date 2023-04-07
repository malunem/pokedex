import React from "react";
import useSiteMetadata from "../hooks/use-site-metadata";

interface SEOProps {
  title?: string | null | undefined;
  description?: string;
  pathname?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, pathname }) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
  } = useSiteMetadata();

  const seo = {
    title: title ?? defaultTitle,
    description: description ?? defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname ?? ``}`,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
    </>
  );
};

SEO.defaultProps = {
  title: undefined,
  description: undefined,
  pathname: undefined,
};

export default SEO;
