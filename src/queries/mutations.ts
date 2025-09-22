import api from "../lib/api.ts";
import {
  ApiResponse,
  FormAccountValues,
  FormEmailValues,
  FormExpenseValues,
  FormLedgerValues,
  FormUserValues
} from "../types/declarations";

const checkAvailability = async <TData = ApiResponse>(formData: FormEmailValues): Promise<TData> => {
  const response = await api.post('auth/availability', formData);
  return response.data;
}

const prerequisiteLogin = async <TData = ApiResponse>(formData: FormEmailValues): Promise<TData> => {
  const response = await api.post('auth/login/precheck', formData);
  return response.data;
}

const login = async <TData = ApiResponse>(formData: FormUserValues): Promise<TData> => {
  const response = await api.post('auth/login', formData);
  return response.data;
}

const register = async<TData = ApiResponse>(formData: FormUserValues): Promise<TData> => {
  const response = await api.post('auth/register', formData);
  return response.data;
}

const logout = async<TData = ApiResponse>(userId: number): Promise<TData> => {
  const response = await api.post('auth/logout', { id: userId });
  return response.data;
}

const updateAccount = async <TData = ApiResponse>(id: number, formData: FormAccountValues): Promise<TData> => {
  const response = await api.patch(`users/${id}`, formData);
  return response.data;
}

const createExpense = async <TData = ApiResponse>(formData: FormExpenseValues): Promise<TData> => {
  const response = await api.post('expenses', formData);
  return response.data;
}

const updateExpense = async <TData = ApiResponse>(id: number, formData: FormExpenseValues): Promise<TData> => {
  const response = await api.put(`expenses/${id}`, formData);
  return response.data;
}

const deleteExpense = async (id: number): Promise<void> => {
  const response = await api.delete(`expenses/${id}`);
  return response.data;
}

const saveLedger = async <TData = ApiResponse>(formData: FormLedgerValues): Promise<TData> => {
  const response = await api.post('ledgers', formData);
  return response.data;
}

const createPassiveIncome = async <TData = ApiResponse>(formData: FormExpenseValues): Promise<TData> => {
  const response = await api.post('passive-incomes', formData);
  return response.data;
}

const updatePassiveIncome = async <TData = ApiResponse>(id: number, formData: FormExpenseValues): Promise<TData> => {
  const response = await api.put(`passive-incomes/${id}`, formData);
  return response.data;
}

const deletePassiveIncome = async (id: number): Promise<void> => {
  const response = await api.delete(`passive-incomes/${id}`);
  return response.data;
}

const mQuery = {
  checkAvailability,
  prerequisiteLogin,
  login,
  register,
  logout,
  updateAccount,
  createExpense,
  updateExpense,
  deleteExpense,
  saveLedger,
  createPassiveIncome,
  updatePassiveIncome,
  deletePassiveIncome,
}

export default mQuery;
