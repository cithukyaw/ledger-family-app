import {FORM_ACTION} from "../lib/constants.ts";
import {FieldError} from "react-hook-form";

type FormActionProps = {
  action: FORM_ACTION.REGISTER | FORM_ACTION.LOGIN
}

type ErrorProps = {
  field: FieldError | undefined
}

type UserContextType = {
  email: string;
  setEmail: (email: string) => void;
}

type ApiValidationError = {
  field: string;
  message: string;
}

type ApiResponse = ApiValidationError | unknown;

type FormEmailValues = {
  email: string
}

type FormUserValues = {
  email: string,
  password: string,
}

// type FormErrorType = Omit<ApiValidationError, 'field'> & {
//   field: keyof FormEmailValues;
// };

type UserTokens = {
  accessToken: string;
  refreshToken: string;
}

export type User = {
  id: number;
  name: string | null;
  email: string;
  role: string;
  active: boolean;
}

export type UserWithTokens = UserTokens & {
  user: User;
};


