import React from "react";
import NoteWindow from "../components/NoteWriter/Modal";
import {
  HStack,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import MultipleCards from "../components/notes/MultipleCards";
import SortingIconButton from "../components/header/SortingIconButton";
import Searchbar from "../components/header/Searchbar";
import DarkModeSwitch from "../components/header/DarkModeSwitch";
import CreateNote from "../components/header/CreateNote";
import { ModalProvider } from '../context/ModalContext.mjs'
import { SortingProvider } from '../context/SortingContext.mjs';
import { SearchProvider } from '../context/SearchContext.mjs'

const Notespage = () => {
  const { isOpen, onClose } = useDisclosure();
  return (
    <>
    <SearchProvider>
    <SortingProvider>
    <ModalProvider>
      <HStack>
        <Heading>NotesApp</Heading>
        <DarkModeSwitch/>
        <CreateNote/>
        <SortingIconButton />
        <Searchbar />
      </HStack>
      <NoteWindow isOpen={isOpen} onClose={onClose} />
      <MultipleCards />
      </ModalProvider>
      </SortingProvider>
      </SearchProvider>
      </>
  );
};

export default Notespage;
