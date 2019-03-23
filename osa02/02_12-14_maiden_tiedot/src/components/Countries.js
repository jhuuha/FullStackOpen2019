import React from 'react'
import CountryInformation from './CountryInformation'

const Countries = ({ countries, newFilter }) => {

    const countriesToShow = (newFilter.length > 0)
        ? countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
        : []

    if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
        //2-10 maiden nimet
        const rows = () => countriesToShow.map(country =>
            <div key={country.name}>{country.name}</div>
        )
        return (
            rows()
        )
    }

    if (countriesToShow.length === 1) {
        //Maan tiedot
        return (
            <CountryInformation country={countriesToShow[0]} />
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