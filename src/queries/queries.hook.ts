import {useQuery} from "@tanstack/react-query";
import {queries} from "./queries.ts";
import dayjs from "dayjs";

const cachedTime = 60 * 60 * 1000; // 1 hour

export const useUserDetails = (userId: number) => {
  return useQuery({
    ...queries.users.detail(userId),
  });
}

export const useCategories = () => {
  return useQuery({
    ...queries.categories.all(),
    staleTime: cachedTime,
  });
}

export const usePaymentTypes = () => {
  return useQuery({
    ...queries.paymentTypes.all(),
    staleTime: cachedTime,
  });
}

export const useUserLedger = (userId: number, date: string) => {
  return useQuery({
    ...queries.users.ledgers(userId, date),
  });
}

export const useExpenses = (dt: string, category?: number[], payType?: string, keyword?: string) => {
  const from = dayjs(dt).startOf('month');
  const to = dayjs(dt).endOf('month');
  return useQuery({
    ...queries.expenses.all(from, to, category, payType, keyword),
  })
}

export const useExpenseDetails = (id: number | undefined) => {
  return useQuery({
    ...queries.expenses.detail(id),
    enabled: !!id,  // This ensures the query only runs if id is defined
  });
};

export const usePassiveIncomes = (dt: string) => {
  const from = dayjs(dt).startOf('month');
  const to = dayjs(dt).endOf('month');
  return useQuery({
    ...queries.passiveIncomes.all(from, to),
  })
}

export const usePassiveIncomeDetails = (id: number | undefined) => {
  return useQuery({
    ...queries.passiveIncomes.detail(id),
    enabled: !!id,  // This ensures the query only runs if id is defined
  });
};
