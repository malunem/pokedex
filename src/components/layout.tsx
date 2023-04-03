import React from "react";
import LanguageSelector from "./language-selector";

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <main style={pageStyles}>
      <LanguageSelector siteTitle="Pokedex" />
      {children}
    </main>
  );

export default Layout;
