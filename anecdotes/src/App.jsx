import { useEffect } from "react";
import { useAnecdoteActions } from "./store";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification"

const App = () => {
  const { initialize } = useAnecdoteActions();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
