import {createQueryKeys, mergeQueryKeys} from "@lukemorales/query-key-factory";
import api from "../lib/api.ts";

const users = createQueryKeys('users', {
  detail: (userId: number) => ({
    queryKey: [userId],
    queryFn: userId
      ? async () => {
        const response = await api.get(`users/${userId}`);
        return response.data;
      }
      : async () => Promise.resolve(undefined), // Prevent unnecessary call if no userId
  }),
});

export const queries = mergeQueryKeys(users);
