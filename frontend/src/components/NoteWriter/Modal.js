import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Pin from "./Pin";
import ColorPicker from "./ColorPicker";
import TextEditor from "./TextEditor";

function NoteWindow() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal
        size="xl"
        isCentered
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add/Edit Notes</ModalHeader>
          <ModalBody>
            <HStack>
              <InputGroup>
                <InputLeftAddon>Title</InputLeftAddon>
                <Input
                  type="text"
                  placeholder="Enter Title"
                  borderColor="gray.200"
                  _hover={{ borderColor: "gray.300" }}
                  _focus={{ borderColor: "gray.300" }}
                />
              </InputGroup>
              <Pin />
              <ColorPicker />
            </HStack>
            <HStack>
              <InputGroup>
                <InputLeftAddon children="Urgency" />
                <Select placeholder="Low">
                  <option value="option1">Medium</option>
                  <option value="option3">High</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>Category</InputLeftAddon>
                <Input
                  type="text"
                  placeholder="Enter Category"
                  borderColor="gray.200"
                  _hover={{ borderColor: "gray.300" }}
                  _focus={{ borderColor: "gray.300" }}
                />
              </InputGroup>
              <Modal />
            </HStack>
            <TextEditor />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>Submit</Button>
            <Button variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NoteWindow;
