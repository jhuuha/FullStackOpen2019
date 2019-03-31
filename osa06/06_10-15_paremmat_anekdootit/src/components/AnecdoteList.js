import React from 'react'
import { connect } from 'react-redux'
import { incVoteOf } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const anecdotes = props.anecdotes
    const filter = props.filter

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        props.incVoteOf(anecdote.id)
        props.showNotification(`you voted ${anecdote.content}`)
        setTimeout(() => { props.hideNotification() }, 5000)
    }

    return (
        <div>
            <br />
            {anecdotes
                .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
                .map(anecdote =>
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

const mapStateToProps = (state) => {
    // joskus on hyödyllistä tulostaa mapStateToProps:ista...
    console.log(state)
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const mapDispatchToProps = {
    incVoteOf,
    showNotification,
    hideNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)