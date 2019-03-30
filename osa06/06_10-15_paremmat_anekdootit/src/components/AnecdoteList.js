import React from 'react'
import { incVoteOf } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const anecdotes = props.store.getState().anecdotes

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        props.store.dispatch(incVoteOf(anecdote.id))
        props.store.dispatch(showNotification(`you voted ${anecdote.content}`))
        setTimeout(() => { props.store.dispatch(hideNotification()) }, 5000)
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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList