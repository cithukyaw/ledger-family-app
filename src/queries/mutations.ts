import api from "../lib/api.ts";
import {ApiResponse, FormEmailValues, FormExpenseValues, FormLedgerValues, FormUserValues} from "../types/declarations";

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
  if (response.status === 201) {
    return await login(formData);
  }

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

const mQuery = {
  checkAvailability,
  prerequisiteLogin,
  login,
  register,
  createExpense,
  updateExpense,
  deleteExpense,
  saveLedger,
}

export default mQuery;
