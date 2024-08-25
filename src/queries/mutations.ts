import api from "../lib/api.ts";
import {ApiResponse, FormEmailValues, FormUserValues} from "../types/declarations";

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

const mQuery = {
  checkAvailability,
  prerequisiteLogin,
  login,
  register,
}

export default mQuery;
