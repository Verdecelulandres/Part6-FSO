
import { create } from 'zustand';
import anecdoteService from './services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
});

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filterString: '',
  actions: {
    vote: (id) => set(state => (
      {
        anecdotes: state.anecdotes
          .map(
            a => a.id === id
              ? { ...a, votes: ++a.votes }
              : a
          )
          .toSorted((a, b) => b.votes - a.votes)
      }
    )),
    add: (anec) => set(state => (
      {
        anecdotes: [...state.anecdotes, asObject(anec)]
      }
    )),
    setFilter: (str) => set(() => ({
      filterString: str
    })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes: anecdotes }));
    }
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filterString = useAnecdoteStore((state) => state.filterString);
  return anecdotes.filter(a => a.content.includes(filterString));
}
export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions);
