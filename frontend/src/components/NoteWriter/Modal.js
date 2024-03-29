import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { BsFillPinFill } from "react-icons/bs";
import { useModal } from '../../context/ModalContext.mjs'
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';

function NoteWindow() {
  const toast = useToast();

  const { isModalOpen, closeModal, initialValues } = useModal();
  const [title, setTitle] = useState("");
  const [urgency, setUrgency] = useState("Low");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [pinActive, setPinActive] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [id, setId] = useState(null);

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || "");
      setUrgency(initialValues.urgency || "Low");
      setCategory(initialValues.category || "");
      setContent(initialValues.content || "");
      setPinActive(initialValues.isPinned || false);
      setSelectedColor(initialValues.backgroundColor || "#ffffff");
      setId(initialValues._id || null);
    }
  }, [initialValues]);

  const saveInfo = async () => {
    const info = {
      title,
      urgency,
      category,
      content,
      isPinned: pinActive,
      backgroundColor: selectedColor,
    };
  
    try {
      if (!id) {
        const response = await fetch("/notes/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        });
    
        if (!response.ok) {
          toast({
            title: "Error !",
            description: "Failed to save the note",
            status: "error",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
        } else if(response.status === 201){
          toast({
            title: "Success !",
            description: "Note saved successfully",
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
        } 
      } else if ((title === "" && content === "<p><br></p>") || (title === "" && content === "")) {
        await fetch(`/notes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        const response = await fetch(`/notes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        });
        if (!response.ok) {
          toast({
            title: "Error !",
            description: "Failed to edit the note",
            status: "error",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
        } else if(response.status === 200){
          toast({
            title: "Success !",
            description: "Note edited successfully",
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
        }
      }
      window.location.reload();
    } catch (err) {
      console.log(err);
    } 
    closeModal();
  };

  
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'list', 'bullet',
    'script', 'indent', 'direction',
    'size', 'color', 'background', 'font',
    'align',
    'link', 'image', 'video',
  ];

  return (
    <>
      <Modal
        size="xl"
        isCentered
        closeOnOverlayClick={false}
        onClose={closeModal}
        isOpen={isModalOpen}
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </InputGroup>
              <IconButton
                aria-label="Toggle Button"
                icon={<BsFillPinFill />}
                onClick={()=>{setPinActive(!pinActive);}}
                colorScheme={pinActive ? "blue" : "gray"}
              />
              <input
                type="color"
                id="favcolor"
                name="favcolor"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                style={{ width: '40px', height: '40px', borderRadius: '5px', cursor: 'pointer' }}
              />
            </HStack>
            <HStack>
              <InputGroup>
                <InputLeftAddon children="Urgency" />
                <Select
                  value={urgency}
                  onChange={(e)=>setUrgency(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </InputGroup>
              <Modal />
            </HStack>
            <ReactQuill
              style={{ marginTop: "5px", backgroundColor: selectedColor }}
              value={content}
              onChange={(newContent, delta, source, editor) => setContent(newContent)}
              modules={modules}
              formats={formats}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveInfo}>Submit</Button>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NoteWindow;