import React from "react";
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import UserFormModal from "./UserForm";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="teal.500" p={4} color="white">
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "start", md: "center" }}
      >
        <Heading size="md" mb={{ base: 2, md: 0 }}>
          Tacnique User Management
        </Heading>
        <Spacer />
        <Button colorScheme="teal" onClick={onOpen} mt={{ base: 2, md: 0 }}>
          Add User
        </Button>
      </Flex>
      <UserFormModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Navbar;
