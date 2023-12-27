import { Button, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons"; 
import { BsPersonFill } from "react-icons/bs";
import React, { useState } from "react";

const Signup = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <Stack>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          <BsPersonFill />
        </InputLeftElement>
        <Input placeholder="Enter name" />
      </InputGroup>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          @
        </InputLeftElement>
        <Input placeholder="Enter email" />
      </InputGroup>
      <InputGroup>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
        />
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          <LockIcon />
        </InputLeftElement>
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        colorScheme="blue"
        // onClick={submitHandler}
        // isLoading={loading}
      >
        Signup
      </Button>
    </Stack>
  );
};

export default Signup;
