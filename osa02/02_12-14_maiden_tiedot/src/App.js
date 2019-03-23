import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'
import './App.css';

const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} newFilter={newFilter} setNewFilter={setNewFilter} />
    </div>
  )
}

export default App;
