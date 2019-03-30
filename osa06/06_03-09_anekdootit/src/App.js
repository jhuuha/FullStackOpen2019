import React from 'react';

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch({
      type: 'VOTE',
      id
    })
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: event.target.content.value,
        votes: 0,
        id: generateId()
      }
    })
    event.target.content.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
