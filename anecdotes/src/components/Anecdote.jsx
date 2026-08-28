import { useAnecdoteActions, useNotificationActions } from "../store";

const Anecdote = ({ anecdote }) => {
  const { vote, remove } = useAnecdoteActions();
  const { display } = useNotificationActions();

  const handleVote = ({ id, content }) => {
    vote(id);
    display(`You voted '${content}'`);
  }

  const handleDelete = ({ id, content }) => {
    remove(id);
    display(`You deleted '${content}'`);
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button
          onClick={() => handleVote(anecdote)}
        >
          vote
        </button>
        {anecdote.votes === 0 &&
          <button
            onClick={() => handleDelete(anecdote)}
          >
            delete
          </button>
        }
      </div>
    </div>
  );
}

export default Anecdote;