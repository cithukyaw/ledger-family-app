import {FORM_ACTION} from "../lib/constants.ts";
import {FieldError} from "react-hook-form";

export type FormActionProps = {
  action: FORM_ACTION.REGISTER | FORM_ACTION.LOGIN
}

export type ErrorProps = {
  field: FieldError | undefined
}

export type UserContextType = {
  email: string;
  setEmail: (email: string) => void;
}
