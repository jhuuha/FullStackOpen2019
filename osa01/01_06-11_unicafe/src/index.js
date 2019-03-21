import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = ({ text, handleClick }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    return (
        <div>
            <h1>statistiikka</h1>
            <Statistic text='hyvä' value={good} />
            <Statistic text='neutraali' value={neutral} />
            <Statistic text='huono' value={bad} />
        </div>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <p>{text} {value}</p>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>anna palautetta</h1>
            <Button text='hyvä' handleClick={() => setGood(good + 1)} />
            <Button text='neutraali' handleClick={() => setNeutral(neutral + 1)} />
            <Button text='huono' handleClick={() => setBad(bad + 1)} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root')
)
