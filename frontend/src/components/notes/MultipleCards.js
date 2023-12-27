// Import necessary Chakra UI components
import {
  Box,
  Text,
  Heading,
  Grid,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Modal,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  HStack,
  ModalFooter,
  Button,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";

// Sample data for cards
const cardsData = [
  {
    title: "",
    content: "Sample content for Card 1",
    backgroundColor: "#ffffff",
    category: "High"
  },
  {
    title: "Card 2",
    content: "Sample content for Card 2",
    backgroundColor: "#aaf0d1",
  },
  {
    title: "Card 3",
    content: "Sample content for Card 3",
    backgroundColor: "#c2e0c6",
  },
  {
    title: "Card 4",
    content: "Sample content for Card 4",
    backgroundColor: "#f0d0c2",
  },
  {
    title: "Card 5",
    content: "Sample content for Card 5",
    backgroundColor: "#d1c2ff",
  },
  {
    title: "Card 6",
    content: "Sample content for Card 6",
    backgroundColor: "#b3e0f0",
  },
  {
    title: "Card 7",
    content: "Sample content for Card 7",
    backgroundColor: "#d8f0c2",
  },
  {
    title: "Card 8",
    content: "Sample content for Card 8",
    backgroundColor: "#f0e0c2",
  },
  {
    title: "Card 7",
    content: "Sample content for Card 7",
    backgroundColor: "#d8f0c2",
  },
  {
    title: "Card 8",
    content: "Sample content for Card 8",
    backgroundColor: "#f0e0c2",
  },
];

const MultipleCards = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    onOpen();
  };

  const handleDelete = () => {
    // Handle delete logic
    console.log("Delete button clicked");
  };

  const handleEdit = () => {
    // Handle edit logic
    console.log("Edit button clicked");
  };

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={2} p={2}>
        {cardsData.map((card) => (
          <Box
            key={card.id}
            maxW="xs"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={2}
            bg={card.backgroundColor}
            cursor="pointer"
            onClick={() => handleCardClick(card)}
          >
            <Heading fontSize="sm" mb={2}>
              {card.title}
            </Heading>
            <Text fontSize="xs" noOfLines={5}>
              {card.content}
            </Text>
          </Box>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={selectedCard && selectedCard.backgroundColor}>
          <ModalHeader>
            Title : {selectedCard && selectedCard.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCard && (
              <>
                <HStack>
                  <Text fontWeight="bold">Category :</Text>
                  <p>{selectedCard && selectedCard.category}</p>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Urgency :</Text>
                  <p>{selectedCard && selectedCard.urgency}</p>
                </HStack>
                  <p>{selectedCard && selectedCard.content}</p>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <IconButton
              icon={<FaPencilAlt />}
              aria-label="Edit"
              onClick={handleEdit}
              mr={3}
            />
            <IconButton
              icon={<BsFillTrash3Fill />}
              aria-label="Delete"
              onClick={handleDelete}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MultipleCards;
