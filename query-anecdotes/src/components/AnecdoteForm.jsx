import { useAnecdotes } from "../hooks/useAnecdotes";
import useNotification from "../hooks/useNotification";


const AnecdoteForm = () => {
  const { displayMessage } = useNotification();
  const { addAnecdote } = useAnecdotes();

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    addAnecdote(content);
    displayMessage(`anecdote '${content}' created`);
    event.target.reset()
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm