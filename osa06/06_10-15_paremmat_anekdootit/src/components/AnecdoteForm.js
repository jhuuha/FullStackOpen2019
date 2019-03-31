import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        props.createAnecdote(content)
        event.target.content.value = ''
        props.showNotification(`you created ${content}`)
        setTimeout(() => { props.hideNotification() }, 5000)
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

const mapDispatchToProps = {
    createAnecdote,
    showNotification,
    hideNotification
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)