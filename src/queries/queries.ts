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

const categories = createQueryKeys('categories', {
  all: () => ({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get(`categories`);
      return response.data || [];
    }
  })
});

const paymentTypes = createQueryKeys('paymentTypes', {
  all: () => ({
    queryKey: ['payment_types'],
    queryFn: async () => {
      const response = await api.get(`expenses/payment-types`);
      return response.data || [];
    }
  })
})

export const queries = mergeQueryKeys(users, categories, paymentTypes);
