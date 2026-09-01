import { useQuery } from "@tanstack/react-query";

export const useAnecdotes = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/anecdotes')
      if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
      }
      return await response.json()
    }
  })
  return {
    anecdotes: result.data,
    isPending: result.isPending
  }
}