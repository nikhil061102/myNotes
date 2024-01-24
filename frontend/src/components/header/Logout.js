import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const LogoutButton = () => {
  const history = useHistory();
  const toast = useToast();

  return (
    <Button
      leftIcon={<IoLogOutOutline style={{ fontSize: "1.5em" }} />}
      colorScheme="blue"
      variant="outline"
      onClick={async () => {
        try {
          const response = await fetch("/logout", {
            method: "GET",
          });

          if (!response.ok) {
            toast({
              title: "Error !",
              description: "Logout failed",
              status: "error",
              position: "top",
              duration: 1000,
              isClosable: true,
            });
          }
          history.push("/");
        } catch (error) {
          console.error("Logout error:", error.message);
        }
      }}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
