import {JSONValue, User} from "../types/declarations";
import CryptoJS from "crypto-js";
import config from "./config.ts";

export const CryptoJsAesEncrypt = (data: JSONValue | string): string => {
  const encrypted = CryptoJS.AES.encrypt(
    typeof data === 'string' ? data : JSON.stringify(data),
    import.meta.env.VITE_APP_SECRET
  );

  return encrypted.toString();
};

export const CryptoJsAesDecrypt = (data: string): JSONValue => {
  const bytes = CryptoJS.AES.decrypt(data, import.meta.env.VITE_APP_SECRET);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const storeItemEncrypted = (key: string, value: JSONValue | string): void => {
  localStorage.setItem(key, CryptoJsAesEncrypt(value));
};

export const getItemDecrypted = (key: string): JSONValue | null => {
  const value = localStorage.getItem(key);

  return value ? CryptoJsAesDecrypt(value) : null;
};

export const isUserLoggedIn = (): boolean => {
  const user = getItemDecrypted(config.userStoreKey) as User;
  return !!user;
}

export const getLoginUser = (): User => {
  return getItemDecrypted(config.userStoreKey) as User;
}
