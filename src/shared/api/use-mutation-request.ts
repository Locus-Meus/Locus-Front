import {
  useMutation,
  type MutationFunction,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query';

export function useMutationRequest<
  TData = unknown,
  TVariables = void,
  TError = Error,
  TContext = unknown,
>(
  request: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn'
  >,
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation({
    ...options,
    mutationFn: request,
  });
}
