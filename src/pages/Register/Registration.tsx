import {FC} from "react";
import {Box} from "@mui/material";
import {Link} from "react-router-dom";

const Registration: FC = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <h1>Create Account</h1>
      <Link to="/login">Already have an account? Sign in here</Link>
    </Box>
  );
}

export default Registration;
