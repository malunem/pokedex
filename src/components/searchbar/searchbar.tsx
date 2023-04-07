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
  Flex,
} from "@chakra-ui/react";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import React, { useState } from "react";
import { Index, Node, Store } from "../../../@types/globals";

const isBrowser = typeof window !== "undefined";

const getSearchResults = (query: string, language: string) => {
  let index: Index | undefined;
  let store: Store | undefined;

  if (isBrowser) {
    index = window.__FLEXSEARCH__?.[language]?.index;
    store = window.__FLEXSEARCH__?.[language]?.store;
  }

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
    <ul>
      {results.map((result) => (
        <Link
          key={`search-${result.name}`}
          aria-label={`search-result-${result.transName}`}
          to={`/pokemon/${result.name}`}
          onClick={onClose}
          className="search-result-item"
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
    </ul>
  );
};

const Search: React.FC = () => {
  const { language, t } = useI18next();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Node[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");

  const breakpoint = isBrowser
    ? useBreakpointValue({
        base: 1,
        md: 2,
        lg: 3,
        ssr: 1,
      }) ?? 1
    : 1;

  const placeholder = t("search-pokemons");

  const openModal = (newSize: ModalSizes) => {
    setSize(newSize);
    onOpen();
  };

  const closeModal = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  const enum ModalSizes {
    MOBILE = "full",
    TABLET_DESKTOP = "xl",
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
      {breakpoint < 3 ? (
        <IconButton
          onClick={
            breakpoint === 1
              ? () => openModal(ModalSizes.MOBILE)
              : () => openModal(ModalSizes.TABLET_DESKTOP)
          }
          m={4}
          id="search-button"
          aria-label="Search"
          icon={<SearchIcon />}
        />
      ) : (
        <Flex w="100%" justifyContent="center">
          <Button
            onClick={() => openModal(ModalSizes.TABLET_DESKTOP)}
            leftIcon={<SearchIcon />}
            color="gray.700"
            fontWeight="thin"
            bgColor="whiteAlpha.400"
            border="1px"
            h="50px"
            w="75%"
            my={10}
            mx="auto"
            boxShadow="inner"
            id="search-button"
          >
            {t("search-pokemons")}
          </Button>
        </Flex>
      )}

      <Modal onClose={() => closeModal()} size={size} isOpen={isOpen}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(20px)" />
        <ModalContent bgColor="white.default">
          <ModalHeader>
            <InputGroup>
              <Input
                className="search__input"
                type="text"
                onChange={search}
                placeholder={placeholder}
              />
              <InputRightElement onClick={() => closeModal()}>
                <CloseIcon />
              </InputRightElement>
            </InputGroup>
          </ModalHeader>
          <ModalBody className="search__list">
            <ResultList {...{ query, results, onClose }} />
          </ModalBody>
          <ModalFooter>
            {query.length > 0 && results.length === 1 && (
              <Text>{`1 ${t("result-for")} "${query}"`}</Text>
            )}

            {query.length > 0 && results.length !== 1 && (
              <Text>{`${results.length} ${t("results-for")} "${query}"`}</Text>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
