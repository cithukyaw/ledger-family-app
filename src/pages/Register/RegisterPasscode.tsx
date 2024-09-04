import {FC} from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import FormPasscode from "../../components/Forms/FormPasscode.tsx";
import {FORM_ACTION} from "../../lib/constants.ts";

const RegisterPasscode: FC = () => {
  return (
    <>
      <HowToRegIcon fontSize="large" color="warning"/>
      <h1>Create Account</h1>

      <FormPasscode action={FORM_ACTION.REGISTER} />
    </>
  );
}

export default RegisterPasscode;
