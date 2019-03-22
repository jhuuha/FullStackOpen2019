import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.name}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {

    const rows = () => parts.map(part =>
        <Part key={part.id} part={part} />
    )

    return (
        <div>
            {rows()}
        </div>
    )
}

const Total = ({ parts }) => {

    const total = parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <p>yhteensä {total} tehtävää</p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const App = () => {

    const courses = [
        {
            name: 'Half Stack -sovelluskehitys',
            id: 1,
            parts: [
                {
                    name: 'Reactin perusteet',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Tiedonvälitys propseilla',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'Komponenttien tila',
                    exercises: 14,
                    id: 3
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewaret',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    const rows = () => courses.map(course =>
        <Course key={course.id} course={course} />
    )

    return (
        <div>
            <h1>Opetusohjelma</h1>
            {rows()}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))