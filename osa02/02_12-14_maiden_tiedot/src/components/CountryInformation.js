import React from 'react'
import './CountryInformation.css'
import Weather from './Weather'

const CountryInformation = ({ country, countryWeather }) => {

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
            <Weather countryWeather={countryWeather} />
        </div>
    )
}

export default CountryInformation