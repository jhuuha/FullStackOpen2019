import React from 'react'
import CountryInformation from './CountryInformation'
import CountryNames from './CountryNames'

const Countries = ({ countries, newFilter, setNewFilter, setCountry, countryWeather }) => {

    const countriesToShow = (newFilter.length > 0)
        ? countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
        : []

    if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
        //2-10 maiden nimet
        return (
            <CountryNames countries={countriesToShow} setNewFilter={setNewFilter} />
        )
    }

    if (countriesToShow.length === 1) {
        //Maan tiedot
        setCountry(countriesToShow[0].name)
        return (
            <CountryInformation country={countriesToShow[0]} countryWeather={countryWeather} />
        )
    }

    if (countriesToShow.length > 10) {
        //Yli 10
        return (
            <div>Too many matches, specify another filter</div>
        )
    }

    return (
        <div></div>
    )

}

export default Countries