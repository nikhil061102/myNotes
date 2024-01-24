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
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
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
      }
      if (data.errors) {
        for (let i = 0; i < data.errors.length; i++) {
          const el = data.errors[i];
          setTimeout(() => {
            toast({
              title: "Error !",
              description: el.msg,
              status: "error",
              position: "top",
              duration: 3000,
              isClosable: true,
            });
          }, i * 250);
        }
      }
      if (data.email) {
        toast({
          title: "Signed Up !",
          description: `Welcome back, ${data.name}`,
          status: "success",
          position: "top",
          duration: 1000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.assign("/notes");
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <Stack>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
        >
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
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
        >
          <LockIcon />
        </InputLeftElement>
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        colorScheme="blue"
        onClick={handleSubmit}
        isLoading={isLoading}
        loadingText="Submitting"
      >
        Login
      </Button>
    </Stack>
  );
};

export default Login;
