import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = ({ text, handleClick }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Statistics = ({ good, neutral, bad }) => {

    const sum = good + neutral + bad
    let average = 0
    let positive = 0

    if (sum > 0) {
        average = (good * 1 + bad * -1) / sum
        positive = (good / sum) * 100
    }

    return (
        <div>
            <h1>statistiikka</h1>
            <Statistic text='hyvä' value={good} unit='' />
            <Statistic text='neutraali' value={neutral} unit='' />
            <Statistic text='huono' value={bad} unit='' />
            <Statistic text='yhteensä' value={sum} unit='' />
            <Statistic text='keskiarvo' value={average} unit='' />
            <Statistic text='positiivisia' value={positive} unit='%' />
        </div>
    )
}

const Statistic = ({ text, value, unit }) => {
    return (
        <div>{text} {value} {unit}</div>
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
