const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to get anecdotes");
  }
  return await response.json();
}

export const createNew = async (newAnecdote) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAnecdote)
  }
  const response = await fetch(baseUrl, options);
  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }
  return await response.json();
}