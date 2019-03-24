import React, { useState, useEffect } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (!(persons.some(person => person['name'] === newName))) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `Lisättiin ${returnedPerson.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 2000)
        })
        .catch(error => {
          setErrorMessage(
            `Virhe: ${error.response.data.error}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 4000)
        })
    } else {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        updatePerson(persons.find(n => n.name === newName).id)
      }
    }
  }

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Poistetaanko ${person.name}`)) {
      personService
        .del(id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `Poistettiin ${person.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 2000)
        })
    }
  }

  const updatePerson = id => {
    const person = persons.find(n => n.id === id)
    const changedPerson = { ...person, number: newNumber }
    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(
          `Henkilölle ${returnedPerson.name} päivitettiin numero ${returnedPerson.number}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 2000)
      })
      .catch(error => {
        setErrorMessage(
          `Virhe: henkilö '${person.name}' poistettu palvelimelta`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
        setPersons(persons.filter(n => n.id !== id))
      })
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
      <Notification message={notificationMessage} color='darkgreen' />
      <Notification message={errorMessage} color='red' />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>lisää uusi</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numerot</h3>
      <Persons persons={persons} newFilter={newFilter} handleDelete={deletePerson} />
    </div>
  )

}

export default App
