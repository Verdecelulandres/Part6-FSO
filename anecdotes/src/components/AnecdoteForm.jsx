import { useAnecdoteActions, useNotificationActions } from "../store";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const { display } = useNotificationActions();

  const addAnecdote = event => {
    event.preventDefault();
    const newAnecdote = event.target.anecdote.value;
    add(newAnecdote);
    display(`You created ${newAnecdote}`);
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