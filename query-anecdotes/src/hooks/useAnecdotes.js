import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, createNew, update } from '../requests';

export const useAnecdotes = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    }
  });

  const voteAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      
      queryClient.setQueryData(['anecdotes'], anecdotes.map(
        a => a.id === votedAnecdote.id
          ? votedAnecdote
          : a
      ));
    }
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    vote: (anecdote) => voteAnecdoteMutation.mutate({ ...anecdote, votes: ++anecdote.votes })
  }
}