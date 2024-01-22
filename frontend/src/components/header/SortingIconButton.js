import React from 'react';
import { IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { BsFunnelFill } from 'react-icons/bs';
import { CalendarIcon, StarIcon } from '@chakra-ui/icons';
import { useSorting } from '../../context/SortingContext.mjs';

const SortingIconButton = () => {
  const { selectedOption, setSortingOption } = useSorting();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<BsFunnelFill />}
        colorScheme="blue"
        variant="outline"
        aria-label="Sort"
      />
      <MenuList minWidth="125px">
        <MenuItem
          as="button"
          icon={<CalendarIcon />}
          onClick={() => setSortingOption('datetime')}
          bg={selectedOption === 'datetime' ? 'blue.500' : ''}
          color={selectedOption === 'datetime' ? 'white' : ''}
        >
          DateTime
        </MenuItem>
        <MenuItem
          as="button"
          icon={<StarIcon />}
          onClick={() => setSortingOption('importance')}
          bg={selectedOption === 'importance' ? 'blue.500' : ''}
          color={selectedOption === 'importance' ? 'white' : ''}
        >
          Importance
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortingIconButton;
