import {createQueryKeys, mergeQueryKeys} from "@lukemorales/query-key-factory";
import api from "../lib/api.ts";

const users = createQueryKeys('users', {
  detail: (userId: number) => ({
    queryKey: [userId],
    async queryFn(){
      const response = await api.post(`users/${userId}`);
      return response.data;
    }
  }),
});

export const queries = mergeQueryKeys(users);
