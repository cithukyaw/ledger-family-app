import {FC} from "react";
import {Box, Container} from "@mui/material";
import Header from "../components/Header/Header.tsx";
import ComingSoon from "../components/ComingSoon.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";

const Account: FC = () => {
  return (
    <Box className="app">
      <Header title="My Account" />
      <Container maxWidth="md">
        <ComingSoon />
      </Container>
      <Navbar/>
    </Box>
  );
}

export default Account;
