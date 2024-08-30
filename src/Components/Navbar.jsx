import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import UserFormModal from "./UserForm";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const paddingValue = useBreakpointValue({ base: 2, md: 3, lg: 4 });
  const textAlign = useBreakpointValue({ base: "center", md: "left" });

  return (
    <Box
      bg="teal"
      p={paddingValue}
      color="white"
      width="100%"
      
      mx="auto"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "center" }}
        justify={{ base: "center", md: "space-between" }}
        textAlign={textAlign}
      >
        <Heading size="md" mb={{ base: 4, md: 0 }}>
          Tacnique User Management
        </Heading>
        <Button colorScheme="teal" onClick={onOpen}>
          Add User
        </Button>
      </Flex>

      <UserFormModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Navbar;
