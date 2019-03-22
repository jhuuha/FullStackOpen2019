import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '045-123456'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const personsToShow = (newFilter.length > 0)
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

  const rows = () => personsToShow.map(person =>
    <div key={person.name}>{person.name} {person.number}</div>
  )

  const addPerson = (event) => {
    event.preventDefault()
    if (newName.length > 0) {
      if (!(persons.some(person => person['name'] === newName))) {
        const personObject = {
          name: newName,
          number: newNumber
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      } else {
        window.alert(`${newName} on jo luettelossa`)
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <div>rajaa näytettäviä: <input value={newFilter} onChange={handleFilterChange} /></div>
      <h3>lisää uusi</h3>
      <form onSubmit={addPerson}>
        <div>nimi: <input value={newName} onChange={handleNameChange} /></div>
        <div>numero: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">lisää</button></div>
      </form>
      <h3>Numerot</h3>
      {rows()}
    </div>
  )

}

export default App
