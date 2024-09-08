import {useQuery} from "@tanstack/react-query";
import {queries} from "./queries.ts";

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
