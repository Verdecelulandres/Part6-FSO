import { describe, test, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

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

    const { result: retievedAnecdotes } = renderHook(() => useAnecdotes());
    expect(retievedAnecdotes.current).toEqual(mockAnecdotes);
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