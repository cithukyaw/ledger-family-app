import api from "../lib/api.ts";
import {ApiResponse, FormEmailValues} from "../types/declarations";

const checkAvailability = async <TData = ApiResponse>(formData: FormEmailValues): Promise<TData> => {
  const response = await api.post('auth/availability', formData);
  return response.data;
}

const prerequisiteLogin = async <TData = ApiResponse>(formData: FormEmailValues): Promise<TData> => {
  const response = await api.post('auth/login/precheck', formData);
  return response.data;
}

const mQuery = {
  checkAvailability,
  prerequisiteLogin
}

export default mQuery;
