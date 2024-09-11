import {FC} from "react";
import {Box, Container} from "@mui/material";
import Header from "../components/Header/Header.tsx";
import ComingSoon from "../components/ComingSoon.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";

const Ledger: FC = () => {
  return (
    <Box className="app">
      <Header title="Ledger" />
      <Container maxWidth="lg">
        <ComingSoon />
      </Container>
      <Navbar/>
    </Box>
  );
}

export default Ledger;
