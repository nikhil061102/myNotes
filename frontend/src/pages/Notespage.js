import React from "react";
import NoteWindow from "../components/NoteWriter/Modal";
import { HStack, Heading, useDisclosure } from "@chakra-ui/react";
import MultipleCards from "../components/notes/MultipleCards";
import SortingIconButton from "../components/header/SortingIconButton";
import Searchbar from "../components/header/Searchbar";
import DarkModeSwitch from "../components/header/DarkModeSwitch";
import CreateNote from "../components/header/CreateNote";
import { ModalProvider } from "../context/ModalContext.mjs";
import { SortingProvider } from "../context/SortingContext.mjs";
import { SearchProvider } from "../context/SearchContext.mjs";
import LogoutButton from "../components/header/Logout";
// import Loader from "../components/notes/Loader";

const Notespage = () => {
  const { isOpen, onClose } = useDisclosure();

  return (
    <>
      <SearchProvider>
        <SortingProvider>
          <ModalProvider>
            <HStack justifyContent="space-between" alignItems="center">
              <HStack>
                <Heading
                  onClick={() => window.location.reload()}
                  cursor="pointer"
                >
                  NotesApp
                </Heading>
                <DarkModeSwitch />
                <CreateNote />
                <SortingIconButton />
                <Searchbar />
              </HStack>
              <LogoutButton />
            </HStack>
            <NoteWindow isOpen={isOpen} onClose={onClose} />
            {/* <Loader/> */}
            <MultipleCards />
          </ModalProvider>
        </SortingProvider>
      </SearchProvider>
    </>
  );
};

export default Notespage;
