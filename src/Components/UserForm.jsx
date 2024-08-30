import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const UserFormModal = ({ isOpen, onClose, user, setUser, refreshUsers }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: { name: "" },
  });
  const toast = useToast();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        company: { name: user.company.name },
      });
    } else {
      setFormData({
        name: "",
        email: "",
        company: { name: "" },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await axios.put(
          `https://jsonplaceholder.typicode.com/users/${user.id}`,
          formData
        );
        toast({
          title: "User updated.",
          description: "The user data has been updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          formData
        );
        toast({
          title: "User added.",
          description: "The new user has been added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      refreshUsers();
      onClose();
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to save user data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user ? "Edit User" : "Add User"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Company</FormLabel>
            <Input
              name="company"
              value={formData.company.name}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  company: { name: e.target.value },
                }))
              }
              placeholder="Enter company name"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {user ? "Save" : "Add"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserFormModal;
