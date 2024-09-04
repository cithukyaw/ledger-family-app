import {FC} from "react";
import Navbar from "../../components/Navbar/Navbar.tsx";
import {Box, Button, Container} from "@mui/material";
import Header from "../../components/Header/Header.tsx";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {Link} from "react-router-dom";

const Expense: FC = () => {
  return (
    <Box className="app">
      <Header title="Expenses" />
      <Container maxWidth="md">
        <Box sx={{ margin: "3em 0" }}>
          <Button
            fullWidth
            className="btn-rounded btn-orange"
            size="large"
            variant="contained"
            component={Link}
            to="/expense/add"
            startIcon={<AddCircleOutlineIcon/>}
          >
            Add Expense
          </Button>
        </Box>
      </Container>
      <Navbar />
    </Box>
  );
}

export default Expense;
