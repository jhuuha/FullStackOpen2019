import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

    const handleVote = () => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)
    }

    const handleNextAnecdote = () => {
        setSelected(Math.floor(Math.random() * 6))
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <h3>{props.anecdotes[selected]}</h3>
            <h3>has {votes[selected]} votes</h3>
            <button className='AnecdoteButton' onClick={handleVote}>vote</button>
            <button className='AnecdoteButton' onClick={handleNextAnecdote}>next anecdote</button>
            <h1>Anecdote with most votes</h1>
            <h3>{props.anecdotes[votes.indexOf(Math.max(...votes))]}</h3>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
