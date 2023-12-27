import { Button, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons"; // Import the LockIcon component
import React, { useState } from "react";

const Login = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };


  return (
    <Stack>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          @
        </InputLeftElement>
        <Input placeholder="Enter email" />
      </InputGroup>
      <InputGroup>
        <Input
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
        Login
      </Button>
    </Stack>
  );
};

export default Login;
