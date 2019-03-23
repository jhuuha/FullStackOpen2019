import React from 'react'

const Persons = ({ persons, newFilter, handleDelete }) => {

    const personsToShow = (newFilter.length > 0)
        ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        : persons

    const rows = () => personsToShow.map(person =>
        <div key={person.name}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>poista</button>
        </div>
    )

    return (
        rows()
    )
}

export default Persons