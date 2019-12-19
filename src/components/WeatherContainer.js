import React, { useState } from 'react';
import '../styles/Weather.css';
import WeatherInfo from './WeatherInfo';

function WeatherContainer () {
  const API_KEY = "f10f34f852f30680ec00f79a24c61334";
  const[searchQuery, setSearchQuery] = useState('');
  const[weatherData, setWeatherData] = useState({
    temp: null,
    humidity: null,
    description: null,
    city: null,
  });
  const [isValidZipCode, setIsValidZipCode] = useState(true);

  function updateSearchQuery(event){
    let zipCode = event.target.value;
    let isValid = validateZipCode(zipCode);
    setSearchQuery(zipCode);
    if (isValid || zipCode === '' || isValid.length === 6) {
      setIsValidZipCode(true);
    } else {
      setIsValidZipCode(false);
    }

  }

  function validateZipCode(zipCode) {
    let regex = /[0-9]{3}\s[0-9]{2}/;
    return regex.test(zipCode);
  }

  function getWeatherData() {
    if (!isValidZipCode || searchQuery === '') {
      setIsValidZipCode(false);
      return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${searchQuery},sk&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setWeatherData({
      temp: convertToCelsius(data.main.temp),
      humidity: data.main.humidity,
      description: data.weather[0].main,
      city: data.name
    }));
  }


  function convertToCelsius(temp) {
    return (temp - 273.15).toFixed(0);
  }

  return(

    <section className="weather-container">
      <header className="weather-header">
        <h3> Slovakia Weather by ZIP Code </h3>
          <div>
            <input placeholder="Zip code eg. 851 01 (must include space to work)" className="search-input" onChange={updateSearchQuery} maxLength='6'/>
            <button onClick={getWeatherData} className="material-icons">search</button>
          </div>
      </header>
      <p className="error">{isValidZipCode ? '' : 'Invalid Zip Code'}</p>
      <section className="weather-info">
        {weatherData.temp === null ? (
          <p> No weather to display. <i className="material-icons">wb_sunny</i> </p>
        ) : <WeatherInfo data={weatherData} />
      }
      </section>
    </section>



  )
}

export default WeatherContainer;
