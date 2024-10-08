import {FC} from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import FormPasscode from "../../components/Forms/FormPasscode.tsx";
import {FORM_ACTION} from "../../lib/constants.ts";
import Logo from "../../components/Logo.tsx";

const RegisterPasscode: FC = () => {
  return (
    <>
      <Logo />
      <h1>Create Account</h1>
      <HowToRegIcon fontSize="large" color="warning"/>
      <FormPasscode action={FORM_ACTION.REGISTER} />
    </>
  );
}

export default RegisterPasscode;
