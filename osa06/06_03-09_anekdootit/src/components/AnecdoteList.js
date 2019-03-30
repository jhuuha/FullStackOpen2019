import React from 'react'
import { incVoteOf } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {

    const anecdotes = props.store.getState().anecdotes

    const vote = (id) => {
        console.log('vote', id)
        props.store.dispatch(
            incVoteOf(id)
        )
    }

    return (
        <div>
            <br />
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
        </div>
    )
}

export default AnecdoteList