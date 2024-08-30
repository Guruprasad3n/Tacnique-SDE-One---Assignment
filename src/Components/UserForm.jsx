import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

const UserForm = ({
  isOpen,
  onClose,
  user,
  onUserUpdate = () => {},
  isAdding,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    company: { name: "" },
  });
  const [errors, setErrors] = useState({});
  const toast = useToast();

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || "",
        name: user.name || "",
        email: user.email || "",
        company: { name: user.company?.name || "" },
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

  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (isAdding && !formData.id) {
      newErrors.id = "ID is required";
    }
    if (!formData.company.name) {
      newErrors.company = "Company name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      if (typeof onUserUpdate === "function") {
        onUserUpdate(formData);
        toast({
          title: isAdding ? "User added." : "User updated.",
          description: isAdding
            ? "User has been added successfully."
            : "User information has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } else {
        console.error("onUserUpdate is not a function");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isAdding ? "Add User" : "Edit User"}</ModalHeader>
        <ModalBody>
          {isAdding && (
            <FormControl id="id" mb={4} isInvalid={errors.id}>
              <FormLabel>ID</FormLabel>
              <Input
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="Enter ID"
              />
              <FormErrorMessage>{errors.id}</FormErrorMessage>
            </FormControl>
          )}
          <FormControl id="name" mt={4} isInvalid={errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl id="email" mt={4} isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl id="company" mt={4} isInvalid={errors.company}>
            <FormLabel>Company</FormLabel>
            <Input
              name="company"
              value={formData.company.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company: { name: e.target.value },
                })
              }
            />
            <FormErrorMessage>{errors.company}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {isAdding ? "Add" : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserForm;