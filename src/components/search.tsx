import { Link, useI18next } from "gatsby-plugin-react-i18next";
import React, { useState } from "react";
import { Node } from "../../@types/globals";

interface SearchProps {
  classNames: string;
}

const getSearchResults = (query: string, language: string) => {
  const { index } = window.__FLEXSEARCH__[language];
  const { store } = window.__FLEXSEARCH__[language];
  if (!index) {
    return [];
  }
  let results: number[] = [];
  index.forEach((item) => {
    results.push(...item.values.search(query));
  });

  // Remove duplicates with Set
  results = [...new Set(results)];

  const nodes: Node[] = [];
  results.forEach((resultID) => {
    const node = store?.find(
      (storeItem) =>
        storeItem.id === resultID && storeItem.node.language === language
    )?.node;
    if (node) nodes.push(node);
  });

  return nodes;
};

interface ResultListProps {
  query: string;
  results: Node[];
}

const ResultList: React.FC<ResultListProps> = ({ query, results }) => {
  if (results.length > 0) {
    return (
      <>
        {results.map((result) => (
          <div className="item-search" key={`search-${result.name}`}>
            <Link to={`/pokemon/${result.name}`}>
              <h4>{result.transName}</h4>
            </Link>
          </div>
        ))}
      </>
    );
  }
  if (query.length > 0) {
    // TODO: add translations
    return <span>No results for {query}</span>;
  }
  return <span />;
};

const Search: React.FC<SearchProps> = ({ classNames }) => {
  const { language } = useI18next();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Node[]>([]);

  const search = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value;
    if (input.length > 0) {
      const searchResults = getSearchResults(input, language);
      setResults(searchResults);
    } else {
      setResults([]);
    }
    setQuery(input);
  };

  return (
    <div className={classNames}>
      <input
        className="search__input"
        type="text"
        onChange={search}
        placeholder="Search"
      />
      <div className="search__list">
        <ResultList {...{ query, results }} />
      </div>
    </div>
  );
};

export default Search;
