import {FC} from "react";
import Navbar from "../../components/Navbar/Navbar.tsx";
import {Box, Container} from "@mui/material";
import Header from "../../components/Header/Header.tsx";
import ComingSoon from "../../components/ComingSoon.tsx";

const Expense: FC = () => {
  return (
    <Box className="app">
      <Header title="Expenses" />
      <Container maxWidth="md">
        <ComingSoon />
      </Container>
      <Navbar />
    </Box>
  );
}

export default Expense;
