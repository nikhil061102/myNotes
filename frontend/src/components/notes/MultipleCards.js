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
} from "@chakra-ui/react";
import React, { useEffect, useState } from 'react'
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { useModal } from '../../context/ModalContext.mjs'
import { useSorting } from '../../context/SortingContext';
import { useSearchContext } from "../../context/SearchContext.mjs";
import { convert } from 'html-to-text';

const MultipleCards = () => {
  const { openModal } = useModal();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCard, setSelectedCard] = useState(null);
  const { selectedOption } = useSorting();
  const { searchTerm } = useSearchContext();

  const sortCardsData = (data, sortingOption) => {
    const urgencyOrder = { High: 1, Medium: 2, Low: 3 };
  
    data.sort((a, b) => {
      if (sortingOption === 'datetime') {
        return b.datetime - a.datetime;
      } else if (sortingOption === 'importance') {
        const urgencyComparison = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  
        if (urgencyComparison !== 0) {
          return urgencyComparison;
        } else {
          return b.datetime - a.datetime;
        }
      }
    });
  
    return data;
  };

  const cards = [
    {
      id: 123,
      title: 'urckic',
      urgency: 'Low',
      category: 'pj4o1z',
      content: '<p>z8j<u>jh</u><u style="color: rgb(194, 133, 255);">qaa</u><u style="background-color: rgb(255, 255, 102); color: rgb(194, 133, 255);">a</u><u style="background-color: rgb(255, 255, 102); color: rgb(194, 133, 255);" class="ql-size-large">a</u><strong style="background-color: rgb(255, 255, 102); color: rgb(194, 133, 255);" class="ql-size-large"><s><u>a</u></s></strong><strong style="background-color: rgb(255, 255, 102);" class="ql-size-large"><s><u>a</u>a</s></strong><strong class="ql-size-large"><s>aa</s>a</strong><strong>abuve<em>dcwia</em></strong><em>bcsibi</em>swbaib</p>',
      isPinned: true,
      backgroundColor: '#df0030',
      datetime: 100
    },
    {
      title: '43yjcl',
      urgency: 'Medium',
      category: '46fiyr',
      content: '7vbdjq',
      isPinned: false,
      backgroundColor: '#aaf3b8',
      datetime: 41
    },
    {
      title: 'u9vx5',
      urgency: 'High',
      category: 'bqqho',
      content: 'xx8osi',
      isPinned: true,
      backgroundColor: '#ac2eae',
      datetime: 1
    },
    {
      title: 'bxtpm9',
      urgency: 'High',
      category: 'rhbx3a',
      content: 'i2vfa',
      isPinned: false,
      backgroundColor: '#79a9bc',
      datetime: 11
    },
    {
      title: 'w05umt',
      urgency: 'High',
      category: 'n9t7hw',
      content: 'quxncl',
      isPinned: false,
      backgroundColor: '#1c7067',
      datetime: 21
    },
    {
      title: 'jcwl1q',
      urgency: 'Low',
      category: 'ygsf0d',
      content: 'z8jjh',
      isPinned: true,
      backgroundColor: '#5f172d',
      datetime: 500
    },
    {
      title: '6i62rq',
      urgency: 'Medium',
      category: 'mbf3je',
      content: 'yz8fl',
      isPinned: false,
      backgroundColor: '#183a3a',
      datetime: 61
    },
    {
      title: 'z0t606',
      urgency: 'Medium',
      category: 'lxxm',
      content: '54z7n',
      isPinned: true,
      backgroundColor: '#c86c5c',
      datetime: 85
    },
    {
      title: '4jch6mo',
      urgency: 'Low',
      category: '63iap',
      content: 'c091r',
      isPinned: false,
      backgroundColor: '#629837',
      datetime: 10000
    }
  ];

  const [cardsData, setCardsData] = useState(cards);
  useEffect(() => {
    setCardsData(
      sortCardsData(
        cards.filter((card) => {
          const titleMatch = card.title.toLowerCase().includes(searchTerm.toLowerCase());
          const categoryMatch = card.category.toLowerCase().includes(searchTerm.toLowerCase());
          const contentMatch = convert(card.content,{wordwrap: false}).toLowerCase().includes(searchTerm.toLowerCase());
          return titleMatch || categoryMatch || contentMatch;
        }),
        selectedOption
      )
    )
  }, [searchTerm, selectedOption]);
  
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

  const handleDelete = (card) => {
    console.log(card.id);
    console.log("Delete button clicked");
    onClose();
  };

  const handleEdit = (card) => {

    console.log("Edit button clicked");
    openModal(card);
    console.log(card);
  };

  const pinnedCards = cardsData.filter((card) => card.isPinned);
  const otherCards = cardsData.filter((card) => !card.isPinned);

  return (
    <>
      {/* Pinned Cards Grid */}
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

      {/* Other Cards Grid */}
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
{/* return (
  <>
    <Grid templateColumns="repeat(4, 1fr)" gap={2} p={2}>
      {cardsData.map((card) => (
        <Box
          key={card.id}
          maxW="xs"
          borderWidth="1px"
          borderRadius="lg"
          overfLow="hidden"
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
      ))}
    </Grid> */}
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
                {selectedCard && <div dangerouslySetInnerHTML={{ __html: selectedCard.content }} />}
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