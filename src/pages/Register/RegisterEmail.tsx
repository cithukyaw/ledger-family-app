import {FC} from "react";
import {Box} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import FormEmail from "../../components/FormEmail.tsx";
import {FORM_ACTION} from "../../lib/constants.ts";

const RegisterEmail: FC = () => {
  return (
    <Box sx={{textAlign: "center"}}>
      <HowToRegIcon fontSize="large" color="warning"/>
      <h1>Create Account</h1>

      <FormEmail action={FORM_ACTION.REGISTER} />
    </Box>
  );
}

export default RegisterEmail;
