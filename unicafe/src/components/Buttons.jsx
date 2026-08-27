import { useStatsControls } from "../store";

const Buttons = () => {
  const { vote } = useStatsControls();

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => vote('good')}>good</button>
      <button onClick={() => vote('neutral')}>neutral</button>
      <button onClick={() => vote('bad')}>bad</button>
    </div>
  )
}

export default Buttons
