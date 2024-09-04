import {FC} from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import FormEmail from "../../components/Forms/FormEmail.tsx";
import {FORM_ACTION} from "../../lib/constants.ts";

const RegisterEmail: FC = () => {
  return (
    <>
      <HowToRegIcon fontSize="large" color="warning"/>
      <h1>Create Account</h1>

      <FormEmail action={FORM_ACTION.REGISTER} />
    </>
  );
}

export default RegisterEmail;
