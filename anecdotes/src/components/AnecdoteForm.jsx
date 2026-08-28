import { useAnecdoteActions } from "../store";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const addAnecdote = event => {
    event.preventDefault();
    add(event.target.anecdote.value);
    event.target.reset();
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input data-testid="new" name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}

export default AnecdoteForm;