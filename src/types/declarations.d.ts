import {FORM_ACTION} from "../lib/constants.ts";
import {FieldError} from "react-hook-form";
import React from "react";
import {UseFormClearErrors, UseFormSetValue} from "react-hook-form/dist/types/form";
import {FieldErrors} from "react-hook-form/dist/types/errors";

type FormActionProps = {
  action: FORM_ACTION.REGISTER | FORM_ACTION.LOGIN
}

type PasscodeInputProps = {
  action?: FORM_ACTION.REGISTER | FORM_ACTION.LOGIN
  setValue: UseFormSetValue<TFieldValues>,
  clearErrors: UseFormClearErrors<TFieldValues>,
  errors: FieldErrors<TFieldValues>,
  focused?: boolean,
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
  tooltip?: string,
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

type ExpenseChartViewProps = {
  data: Array<ExpenseChartData>,
  month: string
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

type FormAccountValues = {
  id?: number,
  name: string,
  email: string,
  password?: string,
}

type FormExpenseValues = {
  id?: number,
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
  exchangeRate?: number,
  currency?: string,
  remarks?: string,
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

type MonthNavState = {
  activeMonth: string,
  nextDisabled: boolean,
}

type ExpenseChartData = {
  day: string,
  amount: number,
}
