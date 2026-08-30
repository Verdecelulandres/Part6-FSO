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

  beforeEach(() => {
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);
  });

  test('initialize correctly grabs anecdotes from server', async () => {
    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: retievedAnecdotes } = renderHook(() => useAnecdotes());
    expect(retievedAnecdotes.current).toEqual(mockAnecdotes);
  });

});