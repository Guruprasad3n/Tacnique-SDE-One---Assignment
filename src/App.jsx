import "./App.css";
import UserList from "./Components/UsersList";
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";


function App() {
  return (
    <>
      <Box>
        <Navbar />
        <Routes>
          <Route path="/" element={<UserList />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
