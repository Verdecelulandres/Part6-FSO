import { useQuery } from "@tanstack/react-query";
import { getAll } from '../requests';

export const useAnecdotes = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })
  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError
  }
}