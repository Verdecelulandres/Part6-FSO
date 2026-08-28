import { useAnecdoteActions, useNotificationActions } from "../store";

const Anecdote = ({ anecdote }) => {
  const { vote } = useAnecdoteActions();
  const { display } = useNotificationActions();

  const handleVote = ({ id, content }) => {
    vote(id);
    display(`You voted '${content}'`);
  }
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  );
}

export default Anecdote;