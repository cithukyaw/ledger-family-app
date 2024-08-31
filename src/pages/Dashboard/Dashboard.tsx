import {FC} from "react";
import {Box, Container} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar.tsx";
import Header from "../../components/Header/Header.tsx";
import ComingSoon from "../../components/ComingSoon.tsx";

const Dashboard: FC = () => {
  return (
    <Box className="app">
      <Header title="Dashboard" />
      <Container maxWidth="md">
        <ComingSoon />
      </Container>
      <Navbar/>
    </Box>
  );
}

export default Dashboard;
