import {FC} from "react";
import {Box, Container} from "@mui/material";
import Navbar from "./Navbar/Navbar.tsx";

const ServerError: FC = () => {
  return (
    <Box className="app">
      <Container maxWidth="lg">
        <Box className="center-content">Some data could not be load because of server error.</Box>
      </Container>
      <Navbar />
    </Box>
  )
}

export default ServerError;
