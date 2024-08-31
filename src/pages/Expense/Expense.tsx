import {FC} from "react";
import Navbar from "../../components/Navbar/Navbar.tsx";
import {Box} from "@mui/material";

const Expense: FC = () => {
  return (
    <>
      <Box sx={{textAlign: "center"}}>
        <h1>Expenses</h1>
        <div>Coming Soon!</div>
      </Box>
      <Navbar />
    </>
  );
}

export default Expense;
