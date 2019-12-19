import React, { Fragment } from 'react';
import '../styles/Weather.css';


function WeatherInfo(props) {
  const { temp, humidity, description, city } = props.data;
  return (
    <Fragment>
      <h3>{description}</h3>
      <section className="weather-data-flex">
        <div className="header-description">
          <h4>City</h4>
          <p>{city}</p>
        </div>
        <div className="header-description">
          <h4>Temperature</h4>
          <p>{temp} <span className="degree-symbol"></span> C</p>
        </div>
        <div className="header-description">
          <h4>Humidity</h4>
          <p>{humidity}%</p>
          </div>
      </section>
    </Fragment>
  )
}

export default WeatherInfo;
