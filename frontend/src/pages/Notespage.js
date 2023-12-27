import React from "react";
import Modal from "../components/NoteWriter/Modal";
import {
  Button,
  HStack,
  Heading,
  IconButton,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { BsFileEarmarkArrowDown, BsFillPinFill } from "react-icons/bs";
import { BsPalette } from "react-icons/bs";
import TextEditor from "../components/NoteWriter/TextEditor";
import MultipleCards from "../components/notes/MultipleCards";
import SortingIconButton from "../components/header/SortingIconButton";
import Searchbar from "../components/header/Searchbar";
import DarkModeSwitch from "../components/header/DarkModeSwitch";
import CreateNote from "../components/header/CreateNote";
import Pin from "../components/NoteWriter/Pin";
import ColorPicker from "../components/NoteWriter/ColorPicker";

const Notespage = () => {
  
  return (
    <>
      <HStack>
        <Heading>NotesApp</Heading>
        <DarkModeSwitch/>
        <CreateNote/>
        <SortingIconButton />
        <Searchbar />
      </HStack>
      <Modal />
      <MultipleCards />
    </>
  );
};

export default Notespage;
