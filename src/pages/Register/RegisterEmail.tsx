import {FC} from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import FormEmail from "../../components/Forms/FormEmail.tsx";
import {FORM_ACTION} from "../../lib/constants.ts";
import Logo from "../../components/Logo.tsx";

const RegisterEmail: FC = () => {
  return (
    <>
      <Logo />
      <h1>Create Account</h1>
      <HowToRegIcon fontSize="large" color="warning"/>
      <FormEmail action={FORM_ACTION.REGISTER} />
    </>
  );
}

export default RegisterEmail;
