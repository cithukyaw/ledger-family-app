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

export const useExpenses = (dt: string) => {
  const from = dayjs(dt).startOf('month');
  const to = dayjs(dt).endOf('month');
  return useQuery({
    ...queries.expenses.all(from, to),
  })
}
