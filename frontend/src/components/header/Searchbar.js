import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  return (
    <InputGroup maxW="200px" minW="200px">
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
      />
      <IconButton
        aria-label="Search"
        icon={<SearchIcon />}
        colorScheme="blue"
      />
    </InputGroup>
  );
};

export default SearchBar;
