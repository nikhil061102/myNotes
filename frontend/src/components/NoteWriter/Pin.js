import { IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillPinFill } from "react-icons/bs";

const Pin = () => {
  const [pinActive, setPinActive] = useState(false);

  const handlePinToggle = () => {
    setPinActive(!pinActive);
  };

  return (
    <IconButton
      aria-label="Toggle Button"
      icon={<BsFillPinFill />}
      onClick={handlePinToggle}
      colorScheme={pinActive ? "blue" : "gray"}
    />
  );
};

export default Pin;
