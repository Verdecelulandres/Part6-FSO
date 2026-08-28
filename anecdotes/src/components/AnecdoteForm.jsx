const AnecdoteForm = () => {
  return (
    <>
      <h2>create new</h2>
      <form>
        <div>
          <input data-testid="new" />
        </div>
        <button>create</button>
      </form>
    </>
  );
}

export default AnecdoteForm;