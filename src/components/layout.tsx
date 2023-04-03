import { Link } from "gatsby-plugin-react-i18next";
import React from "react";
import LanguageSelector from "./language-selector";
import Search from "./search";

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
      <header className="main-header">
      <Link to="/">Home</Link>
      <LanguageSelector />
      <Search classNames="" />
      </header>
      {children}
    </main>
  );

export default Layout;
