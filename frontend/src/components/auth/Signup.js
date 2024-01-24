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
import { BsPersonFill } from "react-icons/bs";
import { useToast } from "@chakra-ui/react";

const Signup = () => {
  const toast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    if (password !== confirmPassword) {
      toast({
        title: "Error !",
        description: "Password and confirm password must match !",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } else {
      try {
        const res = await fetch("/user/signup", {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
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
            description: `Welcome here, ${data.name}`,
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
          <BsPersonFill />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputGroup>
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
          pr="4.5rem"
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
      <InputGroup>
        <Input
          pr="4.5rem"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        colorScheme="blue"
        onClick={handleSubmit}
        isLoading={isLoading}
        loadingText="Submitting"
      >
        Signup
      </Button>
    </Stack>
  );
};

export default Signup;
