import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Alert,
  AlertIcon,
  Box,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import axios from "axios";
import Pagination from "./Pagination";
import DeletePopup from "./DeletePopup";
import UserForm from "./UserForm";

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch(() => setError("Failed to fetch users"));
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    onDeleteOpen();
  };

  const confirmDelete = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        onDeleteClose();
      })
      .catch(() => setError("Failed to delete user"));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUserUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    onClose();
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <Box p={{ base: 4, md: 6 }}>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Table variant="simple" size={{ base: "sm", md: "md" }}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th display={{ base: "none", md: "table-cell" }}>Email</Th>
            <Th display={{ base: "none", md: "table-cell" }}>Department</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentUsers.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name.split(" ")[0]}</Td>
              <Td>{user.name.split(" ")[1]}</Td>
              <Td display={{ base: "none", md: "table-cell" }}>{user.email}</Td>
              <Td display={{ base: "none", md: "table-cell" }}>
                {user.company.name}
              </Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FaEllipsisV />}
                    variant="outline"
                    aria-label="Options"
                  />
                  <MenuList>
                    <MenuItem onClick={() => handleEdit(user)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDelete(user)}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        mt={4}
      />

      {selectedUser && (
        <UserForm
          isOpen={isOpen}
          onClose={onClose}
          user={selectedUser}
          onUserUpdate={handleUserUpdate}
          isAdding={false}
        />
      )}

      {selectedUser && (
        <DeletePopup
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          onConfirm={confirmDelete}
          user={selectedUser}
        />
      )}
    </Box>
  );
};

export default UserList;
