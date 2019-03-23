import React from 'react'
import './CountryInformation.css'

const CountryInformation = ({ country }) => {

    const languages = () => country.languages.map(language =>
        <li key={language.name}>{language.name}</li>
    )

    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>languages</h3>
            <ul>
                {languages()}
            </ul>
            <img className='flag' src={country.flag} alt='flag' />
        </div>
    )
}

export default CountryInformation