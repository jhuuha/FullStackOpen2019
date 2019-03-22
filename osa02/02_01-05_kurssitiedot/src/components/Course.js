import React from 'react'

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

export default Course