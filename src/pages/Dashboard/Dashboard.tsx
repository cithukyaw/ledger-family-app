import {FC} from "react";
import {Box} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar.tsx";

const Dashboard: FC = () => {
  return (
    <>
      <Box sx={{textAlign: "center"}}>
        <h1>Dashboard</h1>
        <div>Coming Soon!</div>
      </Box>
      <Navbar/>
    </>
  );
}

export default Dashboard;
