import React from 'react'
import './CountryNames.css'

const CountryNames = ({ countries, setNewFilter }) => {
    const rows = () => countries.map(country =>
        <div key={country.name}>
            {country.name}
            <button onClick={() => setNewFilter(country.name)}>show</button>
        </div>
    )
    return (
        rows()
    )
}

export default CountryNames