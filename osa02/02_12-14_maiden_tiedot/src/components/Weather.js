import React from 'react'

const Weather = ({ countryWeather }) => {

    if (!(Object.entries(countryWeather).length === 0 && countryWeather.constructor === Object)) {
        console.log(countryWeather)
        return (
            <div>
                <h3>Weather in {countryWeather.location.name}</h3>
                <div><b>temperature:</b> {countryWeather.current.temp_c} Celsius</div>
                <img src={countryWeather.current.condition.icon} alt='weather icon' />
                <div><b>wind:</b> {countryWeather.current.wind_kph} kph direction {countryWeather.current.wind_dir}</div>
            </div>
        )
    }

    return (
        <div></div>
    )
};

export default Weather