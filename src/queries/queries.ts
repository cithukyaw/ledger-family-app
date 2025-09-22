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
  all: (from: Dayjs, to: Dayjs, category?: number[], payType?: string, keyword?: string) => ({
    queryKey: ['expenses', dayjs(from).format('YYYYMMDD'), dayjs(to).format('YYYYMMDD')],
    queryFn: async () => {
      const user = getLoginUser();

      let queryStr = `userId=${user.id}`;
      queryStr += `&from=${dayjs(from).format('YYYY-MM-DD')}&to=${dayjs(to).format('YYYY-MM-DD')}`;
      if (category) {
        queryStr += `&category=${category}`;
      }
      if (payType) {
        queryStr += `&paymentType=${payType}`;
      }
      if (keyword) {
        queryStr += `&keyword=${keyword}`;
      }

      const response = await api.get(`expenses?${queryStr}`);

      // Organize data grouped by date
      const data: Record<string, ExpenseType[]>  = {};
      response.data.data.map((row: ExpenseType) => {
        const key = dayjs(row.date).format('YYYY-MM-DD');
        if (typeof data[key] === 'undefined') {
          data[key] = [];
        }
        data[key].push(row);
      });

      // Organize data grouped by category
      const dataByCategory: Record<string, ExpenseType[]>  = {};
      response.data.data.map((row: ExpenseType) => {
        const key = row.category.name
        if (typeof dataByCategory[key] === 'undefined') {
          dataByCategory[key] = [];
        }
        dataByCategory[key].push(row);
      });

      return {
        data,
        dataByCategory,
        meta: response.data.meta
      }
    }
  }),
  // Get expense details by id
  detail: (id: number | undefined) => ({
    queryKey: [id],
    queryFn: id
      ? async () => {
        const response = await api.get(`expenses/${id}`);
        return response.data;
      }
      : async () => Promise.resolve(undefined), // Prevent unnecessary call if no userId
  }),
})

const passiveIncomes = createQueryKeys('passiveIncomes', {
  all: (from: Dayjs, to: Dayjs) => ({
    queryKey: ['passive-incomes', dayjs(from).format('YYYYMMDD'), dayjs(to).format('YYYYMMDD')],
    queryFn: async () => {
      const user = getLoginUser();

      let queryStr = `userId=${user.id}`;
      queryStr += `&from=${dayjs(from).format('YYYY-MM-DD')}&to=${dayjs(to).format('YYYY-MM-DD')}`;

      const response = await api.get(`passive-incomes?${queryStr}`);

      // Organize data grouped by date
      const data: Record<string, ExpenseType[]>  = {};
      response.data.data.map((row: ExpenseType) => {
        const key = dayjs(row.date).format('YYYY-MM-DD');
        if (typeof data[key] === 'undefined') {
          data[key] = [];
        }
        data[key].push(row);
      });

      return {
        data,
        meta: response.data.meta
      }
    }
  }),
  // Get passive income details by id
  detail: (id: number | undefined) => ({
    queryKey: [id],
    queryFn: id
      ? async () => {
        const response = await api.get(`passive-incomes/${id}`);
        return response.data;
      }
      : async () => Promise.resolve(undefined), // Prevent unnecessary call if no userId
  }),
})

export const queries = mergeQueryKeys(users, categories, paymentTypes, expenses, passiveIncomes);
