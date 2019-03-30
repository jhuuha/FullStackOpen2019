import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        props.store.dispatch(createAnecdote(content))
        event.target.content.value = ''
        props.store.dispatch(showNotification(`you created ${content}`))
        setTimeout(() => { props.store.dispatch(hideNotification()) }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="content" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm