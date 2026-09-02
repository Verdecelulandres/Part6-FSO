import { useAnecdotes } from './hooks/useAnecdotes'
import useNotification from './hooks/useNotification'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const { anecdotes, isPending, isError, vote } = useAnecdotes();
  const { displayMessage } = useNotification();

  const handleVote = async (anecdote) => {
    vote(anecdote);
    displayMessage(`anecdote '${anecdote.content}' voted`);
  }

  if (isPending) {
    return(
      <p>
        Loading anecdotes ...
      </p>
    );
  }

  if (isError) {
    return(
      <p>anecdote service not available due to problems in server</p>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App