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
  IconButton,
  useToast,
  Container,
} from "@chakra-ui/react";
import React, { useEffect, useState } from 'react'
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { useModal } from '../../context/ModalContext.mjs'
import { useSorting } from '../../context/SortingContext';
import { useSearchContext } from "../../context/SearchContext.mjs";
import { convert } from 'html-to-text';
import Loader from "./Loader";

const MultipleCards = () => {
  const toast = useToast();

  const { openModal } = useModal();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCard, setSelectedCard] = useState(null);
  const { selectedOption } = useSorting();
  const { searchTerm } = useSearchContext();
  const [loading, setLoading] = useState(false);
  const sortCardsData = (data, sortingOption) => {
    const urgencyOrder = { High: 1, Medium: 2, Low: 3 };
  
    data.sort((a, b) => {
      if (sortingOption === 'datetime') {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else if (sortingOption === 'importance') {
        const urgencyComparison = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  
        if (urgencyComparison !== 0) {
          return urgencyComparison;
        } else {
          return new Date(b.timestamp) - new Date(a.timestamp);
        }
      }

      return data;
    });
  
    return data;
  };
  const [cards, setCards] = useState([]); 
  
  useEffect(() => {
    const loadInit = async () => {
      setLoading(true);
      try {
        const res = await fetch("/notes/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.err) {
          toast({
            title: "Error !",
            description: data.err,
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
        } else {
          const filteredCards = data.notes.filter(card =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            convert(card.content, { wordwrap:null }).toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.category.toLowerCase().includes(searchTerm.toLowerCase())
          );

          const updatedCards = sortCardsData(filteredCards, selectedOption);

          setCards(updatedCards);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    return loadInit;
  }, [selectedOption, searchTerm, toast]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    onOpen();
  };

  const CardBox = ({ card }) => (
    <Box
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
      <Text fontSize="xs" noOfLines={4} dangerouslySetInnerHTML={{ __html: card.content }} />
    </Box>
  );

  const handleDelete = async (card) => {
    try {
      const response = await fetch(`/notes/${card._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (!response.ok) {
        toast({
          title: "Error !",
          description: "Failed to delete the note",
          status: "error",
          position: "top",
          duration: 1000,
          isClosable: true,
        });
      } else{
        toast({
          title: "Success !",
          description: "Note deleted successfully",
          status: "success",
          position: "top",
          duration: 1000,
          isClosable: true,
        });
      }
      onClose(); 
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (card) => {
    openModal(card);
    onClose();
  };

  const pinnedCards = cards.filter((card) => card.isPinned);
  const otherCards = cards.filter((card) => !card.isPinned);
  
  return (
    <>
      {loading && <Loader/>}
      {pinnedCards.length > 0 && (
        <>
          {pinnedCards.length > 0 && <Heading fontSize="xl" mb={4}>Pinned</Heading>}
          <Grid templateColumns="repeat(4, 1fr)" gap={2} p={2}>
            {pinnedCards.map((card) => (
              <CardBox key={card.id} card={card} />
            ))}
          </Grid>
        </>
      )}

      {otherCards.length > 0 && (
        <>
        {pinnedCards.length > 0 && <Heading fontSize="xl" mb={4}>Others</Heading>}
        <Grid templateColumns="repeat(4, 1fr)" gap={2} p={2}>
          {otherCards.map((card) => (
            <CardBox key={card.id} card={card} />
          ))}
        </Grid>
        </>
      )}

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
                <Text fontWeight="bold">Urgency :</Text>
                <p>{selectedCard && selectedCard.urgency}</p>
              </HStack>
                <Text fontWeight="bold">Content :</Text>
                <Container>{selectedCard && <div dangerouslySetInnerHTML={{ __html: selectedCard.content }} />}</Container>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <IconButton
            icon={<FaPencilAlt />}
            aria-label="Edit"
            onClick={() => handleEdit(selectedCard)}
            mr={3}
          />
          <IconButton
            icon={<BsFillTrash3Fill />}
            aria-label="Delete"
            onClick={() => handleDelete(selectedCard)}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);
};

export default MultipleCards;