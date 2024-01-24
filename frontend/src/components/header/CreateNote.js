import { Button } from "@chakra-ui/react";
import React from "react";
import { TfiPencilAlt } from "react-icons/tfi";
import { useModal } from '../../context/ModalContext.mjs'


const CreateNote = () => {
  const { openModal } = useModal();
  
  return (
    <Button
      leftIcon={<TfiPencilAlt style={{ fontSize: "1.5em" }} />}
      colorScheme="blue"
      variant="outline"
      onClick={openModal}
    >
      New Note
    </Button>
  );
};

export default CreateNote;
