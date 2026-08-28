import { useAnecdotes, useAnecdoteActions, useNotificationActions } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdoteActions();
  const { display } = useNotificationActions();

  const handleVote = ({ id, content }) => {
    vote(id);
    display(`You voted '${content}'`);
  }

  return (
    <div>
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

export default AnecdoteList;