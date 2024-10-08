import axios, {AxiosError, AxiosResponse} from "axios";
// import {ACCESS_TOKEN} from "./constants.ts";
import {FieldValues, UseFormSetError} from "react-hook-form";
import config from "./config.ts";
import {toast} from "react-toastify";
import {getLoginUser} from "./utils.ts";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // Include the HTTP-only cookie for access token
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) { // when user is not authenticated
      const user = getLoginUser(); // Check user info from localStorage
      // go to the passcode entry screen if user is previously logged in, otherwise go to the home screen
      if (user) {
        window.location.href = '/login/complete';
      } else {
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  },
);

// api.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

export const apiErrorHandling = <TData extends FieldValues>(err: Error | AxiosError, setError: UseFormSetError<TData>) => {
  console.error('error', err);
  if (axios.isAxiosError(err))  {
    const response = err.response as AxiosResponse;
    if (typeof response !== 'undefined' && response.status === 400) {
      response.data.map((err: TData) => {
        return setError(err.field, { type: "custom", message: err.message });
      });
    } else {
      toast.error(err.message, config.toastOptions);
    }
  } else {
    toast.error(err.message, config.toastOptions);
  }
}

export default api;
