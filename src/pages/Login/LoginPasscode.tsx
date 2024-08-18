import {FC} from "react";
import {Box} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import {FORM_ACTION} from "../../lib/constants.ts";
import FormPasscode from "../../components/FormPasscode.tsx";

const LoginPasscode: FC = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <LoginIcon fontSize="large" color="warning" />
      <h1>Sign In</h1>

      <FormPasscode action={FORM_ACTION.LOGIN} />
    </Box>
  );
}

export default LoginPasscode;
