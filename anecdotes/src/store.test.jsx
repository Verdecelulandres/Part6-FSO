import { describe, test, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, render, screen } from '@testing-library/react';

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}));

import anecdoteService from './services/anecdotes';
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from './store';
import AnecdoteList from './components/AnecdoteList';

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filterString: '' });
  vi.clearAllMocks();
});

describe('When the backend has notes', () => {
  const mockAnecdotes = [
    { id: 1, content: 'Test1', votes: 0 },
    { id: 2, content: 'Test2', votes: 0 },
  ];
  anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

  beforeEach(async () => {
    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

  });

  test('initialize correctly grabs anecdotes from server', () => {
    render(<AnecdoteList />);
    // const anecdotes = screen.queryAllByTestId("anecdote");
    // screen.debug(anecdotes[0]);
    const anecdotes = screen.getAllByText(/^Test\d/);

    // screen.debug(anecdotes);
    
    const { result: retievedAnecdotes } = renderHook(() => useAnecdotes());
    expect(retievedAnecdotes.current).toEqual(mockAnecdotes);
    expect(anecdotes).toHaveLength(2);
    expect(anecdotes[0].innerHTML).toEqual('Test1');
    expect(anecdotes[1].innerHTML).toEqual('Test2');
  });


  describe('when voting', () => {
    const mockVote = { id: 2, content: 'Test2', votes: 1 };
    anecdoteService.update.mockResolvedValue(mockVote);

    beforeEach(async () => {
      const { result } = renderHook(() => useAnecdoteActions());

      await act(async () => {
        await result.current.vote(2);
      });
    });
    test('voting increase number of votes', () => {

      const { result: retievedAnecdotes } = renderHook(() => useAnecdotes());

      expect(retievedAnecdotes.current.find(a => a.id === 2)).toEqual(mockVote);
    });

    test('anecdotes are sorting according to votes', () => {
      const mockSortedAnecdotes = [
        { id: 2, content: 'Test2', votes: 1 },
        { id: 1, content: 'Test1', votes: 0 },
      ];
      const { result: retievedAnecdotes } = renderHook(() => useAnecdotes());

      expect(retievedAnecdotes.current).toEqual(mockSortedAnecdotes);
    });

  });
});