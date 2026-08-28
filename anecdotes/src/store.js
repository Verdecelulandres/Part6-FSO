
import { create } from 'zustand';
import anecdoteService from './services/anecdotes';

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filterString: '',
  actions: {
    vote: async (id) => {
      const votedAnecdote = get().anecdotes
        .find(a => a.id === id);
      votedAnecdote.votes++;
      const updated = await anecdoteService
        .update(id, votedAnecdote);
      set(state => ({
        anecdotes: state.anecdotes
          .map(a => a.id === id ? updated : a)
          .toSorted((a, b) => b.votes - a.votes)
      }));
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content);
      set(state => ({
        anecdotes: [...state.anecdotes, newAnecdote]
      }));
    },
    setFilter: (str) => set(() => ({
      filterString: str
    })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({
        anecdotes: anecdotes
          .toSorted((a, b) => b.votes - a.votes)
      }));
    }
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filterString = useAnecdoteStore((state) => state.filterString);
  return anecdotes.filter(a => a.content.includes(filterString));
}
export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions);
