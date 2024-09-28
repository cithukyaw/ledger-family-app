import {FORM_ACTION} from "../lib/constants.ts";
import {FieldError} from "react-hook-form";
import React from "react";

type FormActionProps = {
  action: FORM_ACTION.REGISTER | FORM_ACTION.LOGIN
}

type ErrorProps = {
  field: FieldError | undefined
}

type ChildrenProps = {
  children: React.ReactNode
}

type HeaderProps = {
  title: string
}

type ListCardProps = {
  title: string,
  data: Array<ExpenseType>,
  setBackdropOpen?: Dispatch<SetStateAction<boolean>>
}

type InfoCardProps = {
  title: string,
  amount: number,
  icon?: React.ReactNode,
}

type LoadingProps = {
  fullScreen?: boolean
}

type LoadingBackdropProps = {
  open: boolean
}

type ActionDialogProps = {
  selectedAction: string;
  open: boolean;
  onClose: (value: string) => void;
  title?: string;
}

type MonthNavigatorProps = {
  setSelectedMonth?: Dispatch<SetStateAction<boolean>>
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

type FormExpenseValues = {
  userId: number,
  date: string,
  title: string,
  amount: number,
  category: number,
  type: string,
  remarks: string,
}

type FormLedgerValues = {
  id?: number,
  userId: number,
  date: string,
  current: number,
  income: number,
  parentSupport: number,
  budget: number,
}

// type FormErrorType = Omit<ApiValidationError, 'field'> & {
//   field: keyof FormEmailValues;
// };

type UserTokens = {
  accessToken: string;
  refreshToken: string;
}

type User = {
  id: number;
  name: string | null;
  email: string;
  role: string;
  active: boolean;
}

type UserWithTokens = UserTokens & {
  user: User;
};

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

type CategoryType = {
  id: number,
  name: string,
}

type ExpenseType = {
  id: number,
  userId: number,
  categoryId: number,
  category: CategoryType,
  type: string,
  date: string,
  title: string,
  amount: number,
  remarks?: string,
  createdAt: string,
  updatedAt?: string,
  deletedAt?: string
}

type LongPressOptions = {
  shouldPreventDefault?: boolean;
  delay?: number;
}
