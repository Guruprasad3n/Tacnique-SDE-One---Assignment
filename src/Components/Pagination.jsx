import React from "react";
import { Button, Flex } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Flex justify="center" mt={4}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        mx={1}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          onClick={() => onPageChange(index + 1)}
          variant={currentPage === index + 1 ? "solid" : "outline"}
          mx={1}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        mx={1}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
