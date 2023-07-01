import logo from './logo.svg';
import { useEffect, useState } from 'react';
import fetchWeather from './FetchWeather';

const SearchBar = (props) => {

  // Add state to input for re-render
  const [location, setLocation] = useState("");

  const handleChange = (e) => {
    setLocation(e.target.value);
  }

  // Retrieve current weather and parse data
  const handleClick = () => {
    fetchWeather(location, props.setWeatherData)
  }

  return (
    <>
      <button onClick={handleClick} type='submit' className='btn btn-outline-dark'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
      </button>
      <input name="location" onChange={handleChange} defaultValue="New York" className='border-0 border-bottom p-2 mb-5' style={{outline:'none'}} />
    </>
  );
}

// destructure
const Primary = (props) => {
  let imgURL = `https://openweathermap.org/img/wn/${props.weatherData.icon}@2x.png`
  return (
    <>
      <div className='row'>
        <div className='col d-flex align-items-center justify-content-end p-0 pe-2'>
        <img src={imgURL} style={{width:'60px'}}></img>
        </div>
        <div className='col text-start align-items-center justify-content-center p-0'>
          <p className='p-0 m-0'><b>{props.weatherData.clouds}</b></p>
          <p className='p-0 m-0 fw-lighter'>{props.weatherData.windSpeedDescription}</p>
        </div>
      </div>
      <h1>{props.weatherData.temp}°F</h1>
      <h5 className='fst-italic'>Feels like {props.weatherData.feelsLike} °F</h5>
    </>
  );
}

const Statistics = (props) => {
  return (
    <div className='border rounded p-5 m-3 mt-5 text-center'>
      <div className='row'>
        <div className='col'>
          <p>Wind: {props.weatherData.windSpeed} mph</p>
          <p>Pressure: {props.weatherData.pressure} inHg</p>
        </div>
        <div className='col'>
          <p>Humidity: {props.weatherData.humidity}%</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [weatherData, setWeatherData] = useState({
    temp: "",
    windSpeedDescription: "",
    feelsLike: "",
    clouds: "",
    icon: "",
    windSpeed: "",
    humidity: "",
    pressure: "",
  });

  // Initialize data
  useEffect(() => {
    fetchWeather("New York", setWeatherData);
  }, [])

  return (
    <div className='container text-center mt-5' style={{maxWidth:'900px'}}>
      <SearchBar setWeatherData={setWeatherData} />
      <div className='container p-5 mt-3 border rounded'>
        <Primary weatherData={weatherData} />
        <Statistics weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
