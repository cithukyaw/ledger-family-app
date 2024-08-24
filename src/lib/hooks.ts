import {MutationFunction, MutationOptions, useMutation, UseMutationResult} from "@tanstack/react-query";

export const useLazyQuery = <TData = unknown, TError = Error, TVariables = unknown>(
  fn: MutationFunction<TData, TVariables>,
  options: MutationOptions<TData, TError, TVariables> = {}
): UseMutationResult<TData, TError, TVariables> => {
  return useMutation<TData, TError, TVariables>({
    mutationFn: fn,
    ...options
  });
}
