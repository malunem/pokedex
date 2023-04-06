import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  useBreakpointValue,
  Flex
} from "@chakra-ui/react";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import React, { useState } from "react";
import { Node } from "../../../@types/globals";

export interface SearchProps {
  classNames: string;
}

const getSearchResults = (query: string, language: string) => {
  const { index } = window.__FLEXSEARCH__?.[language] ?? {};
  const { store } = window.__FLEXSEARCH__?.[language] ?? {};
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
  results: Node[];
  onClose: () => void;
}

const ResultList: React.FC<ResultListProps> = ({ results, onClose }) => {
  if (results.length === 0) return <span />;

  return (
    <>
      {results.map((result) => (
        <Link
          key={`search-${result.name}`}
          aria-label={`search-result-${result.transName}`}
          to={`/pokemon/${result.name}`}
          onClick={onClose}
        >
          <Text
            fontSize="xl"
            fontWeight="bold"
            _hover={{ transform: "scale(1.05)" }}
          >
            {result.transName}
          </Text>
        </Link>
      ))}
    </>
  );
};

const Search: React.FC<SearchProps> = () => {
  const { language, t } = useI18next();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Node[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
    ssr: true
  });

  const handleSizeClick = (newSize: ModalSizes) => {
    setSize(newSize);
    onOpen();
  };

  const enum ModalSizes {
    MOBILE = "full",
    DESKTOP = "xl"
  }

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
    <>
      {isMobile ? (
        <IconButton
          onClick={() => handleSizeClick(ModalSizes.MOBILE)}
          m={4}
          id="search-button"
          aria-label="Search"
          icon={<SearchIcon />}
        />
      ) : (
        <Flex w="100%" justifyContent="center">
          <Button
            onClick={() => handleSizeClick(ModalSizes.DESKTOP)}
            leftIcon={<SearchIcon />}
            color="gray.400"
            fontWeight="thin"
            bgColor="whiteAlpha.400"
            border="1px"
            h="50px"
            w="75%"
            my={10}
            mx="auto"
            boxShadow="inner"
          >
            {t("Search")} Pokémons
          </Button>
        </Flex>
      )}

      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(20px)" />
        <ModalContent bgColor="white.default">
          <ModalHeader>
            <InputGroup>
              <Input
                className="search__input"
                type="text"
                onChange={search}
                placeholder="Search"
              />
              <InputRightElement onClick={onClose}>
                <CloseIcon />
              </InputRightElement>
            </InputGroup>
          </ModalHeader>
          <ModalBody className="search__list">
            <ResultList {...{ query, results, onClose }} />
          </ModalBody>
          <ModalFooter>
            {query.length > 0 && results.length === 1 && (
              // TODO: add translations
              <Text>{`1 ${t("result for")} ${query}`}</Text>
            )}

            {query.length > 0 && results.length !== 1 && (
              // TODO: add translations
              <Text>{`${results.length} ${t("results for")} ${query}`}</Text>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
