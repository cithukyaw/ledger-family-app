import {FC} from "react";
import {Box} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import FormPasscode from "../../components/FormPasscode.tsx";
import {FORM_ACTION} from "../../lib/constants.ts";

const RegisterPasscode: FC = () => {
  return (
    <Box sx={{textAlign: "center"}}>
      <HowToRegIcon fontSize="large" color="warning"/>
      <h1>Create Account</h1>

      <FormPasscode action={FORM_ACTION.REGISTER} />
    </Box>
  );
}

export default RegisterPasscode;
