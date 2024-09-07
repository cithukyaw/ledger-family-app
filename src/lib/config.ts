import {ToastOptions} from "react-toastify";

const config = {
  "userStoreKey": "user",
  "toastOptions": {},
};

const toastOptions: ToastOptions = {
  position: "top-center",
  theme: "dark",
  autoClose: 1500,
}

config.toastOptions = toastOptions;

export default config;