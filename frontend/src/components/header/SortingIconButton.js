import React from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BsFunnelFill } from "react-icons/bs";
import { CalendarIcon, StarIcon } from "@chakra-ui/icons";

const SortingIconButton = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<BsFunnelFill />}
        colorScheme="blue"
        variant="outline"
        aria-label="Sort"
      >
        Sort
      </MenuButton>
      <MenuList minWidth='150px'>
        <MenuItem icon={<CalendarIcon />}>DateTime</MenuItem>
        <MenuItem icon={<StarIcon />}>Importance</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortingIconButton;