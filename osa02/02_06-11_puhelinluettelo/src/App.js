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

  const rows = () => persons.map(person =>
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

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addPerson}>
        <div>nimi: <input value={newName} onChange={handleNameChange} /></div>
        <div>numero: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">lisää</button></div>
      </form>
      <h2>Numerot</h2>
      {rows()}
    </div>
  )

}

export default App
