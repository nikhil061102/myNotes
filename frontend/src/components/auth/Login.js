import React, { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = () => {
    // Your login logic here, you can use 'email' and 'password' state variables
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Stack>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          @
        </InputLeftElement>
        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          <LockIcon />
        </InputLeftElement>
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => {setShowPassword(!showPassword)}}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button colorScheme="blue" onClick={handleSubmit} isLoading={isLoading} loadingText='Submitting'>
        Login
      </Button>
    </Stack>
  );
};

export default Login;
