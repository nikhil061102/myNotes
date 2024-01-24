import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSearchContext } from "../../context/SearchContext.mjs";

const SearchBar = () => {
  const { searchTerm, setSearch } = useSearchContext();

  return (
    <InputGroup maxW="150px" minW="150px">
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        type="text"
        placeholder="Search..."
        borderColor="gray.200"
        _hover={{ borderColor: "gray.300" }}
        _focus={{ borderColor: "gray.300" }}
        value={searchTerm}
        onChange={(e) => setSearch(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
