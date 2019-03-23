import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'
import './App.css';

const App = () => {

  const [countries, setCountries] = useState([])
  const [countryWeather, setCountryWeather] = useState({})
  const [newFilter, setNewFilter] = useState('')
  const [country, setCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (country !== '') {
      axios
        .get(`https://api.apixu.com/v1/current.json?key=1773e405a6544b5bb8475325192303&q=${country}`)
        .then(response => {
          setCountryWeather(response.data)
        })
    }
  }, [country])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} newFilter={newFilter} setNewFilter={setNewFilter} setCountry={setCountry} countryWeather={countryWeather} />
    </div>
  )
}

export default App;
