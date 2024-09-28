import {createQueryKeys, mergeQueryKeys} from "@lukemorales/query-key-factory";
import api from "../lib/api.ts";
import dayjs, {Dayjs} from "dayjs";
import {getLoginUser} from "../lib/utils.ts";
import {ExpenseType} from "../types/declarations";

const users = createQueryKeys('users', {
  // Get user details by userId
  detail: (userId: number) => ({
    queryKey: [userId],
    queryFn: userId
      ? async () => {
        const response = await api.get(`users/${userId}`);
        return response.data;
      }
      : async () => Promise.resolve(undefined), // Prevent unnecessary call if no userId
  }),
  // Get ledger by userId and date
  ledgers: (userId: number, date: string) => ({
    queryKey: [userId, dayjs(date).format('YYYYMMDD')],
    queryFn: userId
      ? async () => {
        const response = await api.get(`users/${userId}/ledgers?date=${date}`);
        return response.data;
      }
      : async () => Promise.resolve(undefined), // Prevent unnecessary call if no userId
  })
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

const expenses = createQueryKeys('expenses', {
  all: (from: Dayjs, to: Dayjs) => ({
    queryKey: ['expenses', dayjs(from).format('YYYYMMDD'), dayjs(to).format('YYYYMMDD')],
    queryFn: async () => {
      const user = getLoginUser();
      const queryStr = `userId=${user.id}&from=${dayjs(from).format('YYYY-MM-DD')}&to=${dayjs(to).format('YYYY-MM-DD')}`;

      const response = await api.get(`expenses?${queryStr}`);

      // Organize data grouped by date
      const data: Record<string, ExpenseType[]>  = {};
      response.data.data.map((row: ExpenseType) => {
        if (typeof data[row.date] === 'undefined') {
          data[row.date] = [];
        }
        data[row.date].push(row);
      });

      return {
        data,
        meta: response.data.meta
      }
    }
  })
})

export const queries = mergeQueryKeys(users, categories, paymentTypes, expenses);
