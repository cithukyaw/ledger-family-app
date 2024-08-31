import {useQuery} from "@tanstack/react-query";
import {queries} from "./queries.ts";

const maxGcTime = 24 * 60 * 60 * 1000; // 24 hours

export const useUserDetails = (userId: number) => {
  return useQuery({
    ...queries.users.detail(userId),
    retry: false
  });
}

export const useCategories = () => {
  return useQuery({
    ...queries.categories.all(),
    retry: false,
    gcTime: maxGcTime
  });
}

export const usePaymentTypes = () => {
  return useQuery({
    ...queries.paymentTypes.all(),
    retry: false,
    gcTime: maxGcTime
  });
}
