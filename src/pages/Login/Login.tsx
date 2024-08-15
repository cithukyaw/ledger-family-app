import {FC} from "react";
import {Box} from "@mui/material";
import {Link} from "react-router-dom";

const Login: FC = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <h1>Sign In</h1>
      <Link to="/register">If you don't have an account, <br />please sign up here</Link>
    </Box>
  );
}

export default Login;
