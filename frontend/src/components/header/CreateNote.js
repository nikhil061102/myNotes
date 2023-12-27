import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { TfiPencilAlt } from "react-icons/tfi";
// import NoteWindow from "../NoteWriter/Modal";

const CreateNote = () => {
  // const handleOpenModal = () => {
  //   const { onOpen } = useDisclosure();
  //   onOpen();
  // };
  return (
    <>
    <Button
      leftIcon={<TfiPencilAlt style={{ fontSize: "1.5em" }} />}
      colorScheme="blue"
      variant="outline"
      // onClick={handleOpenModal}
    >
      New Note
    </Button>
    {/* <NoteWindow /> */}
    </>
  );
};

export default CreateNote;
