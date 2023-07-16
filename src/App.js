import logo from './logo.svg';
import { useEffect, useState } from 'react';
import fetchWeather from './FetchWeather';
import HourlyForecast from './HourlyForecast';
import WeekForcast from './WeekForecast';
import Navbar from './Navbar';
import Aside from './Aside';

const SearchBar = (props) => {
  const handleChange = (e) => {
    props.setPreferences((oldPreferences) => {
      return {...oldPreferences, location: e.target.value}
    });
  }

  // Retrieve current weather and parse data
  const handleClick = () => {
    fetchWeather(props.preferences.location, props.preferences.metric, props.setWeatherData)
  }

  return (
    <>
      <div className='d-flex flex-row align-items-top justify-content-center mb-5'>
          <button onClick={handleClick} type='submit' className='btn btn-primary p-2 rounded-0'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
          <input name="location" onChange={handleChange} defaultValue={props.preferences.location} className='border p-2' style={{outline:'none'}} />
      </div>
    </>
  );
}

const Primary = (props) => {
  //let imgURL = `./${props.weatherData.icon}`
  return (
    <>
      <div className='row align-items-center'>
        <div className='col d-flex align-items-center justify-content-end p-0 pe-2'>
        <img src={props.weatherData.icon} style={{width:'60px'}}></img>
        </div>
        <div className='col text-start align-items-center justify-content-center p-0'>
          <p className='p-0 m-0'><b>{props.weatherData.clouds}</b></p>
          <p className='p-0 m-0 fw-lighter'>{props.weatherData.windSpeedDescription}</p>
        </div>
      </div>
      <h1>{props.metric === "F" ? props.weatherData.temp_f : props.weatherData.temp_c}</h1>
      <h5 className='fst-italic'>Feels like {props.metric === "F" ? props.weatherData.feelsLike_f : props.weatherData.feelsLike_c}</h5>
    </>
  );
}

const Statistics = (props) => {
  return (
    <div className='border rounded p-4 m-3 mt-5 text-center'>
      <div className='row'>
        <div className='col pb-4'>
          <h5 className='mt-4 fw-bold'>Wind</h5>
          {props.metric === "F" ? props.weatherData.windSpeed_mph : props.weatherData.windSpeed_kph}
          <h5 className='mt-4 fw-bold'>Pressure</h5>
          {props.metric === "F" ? props.weatherData.pressure_in : props.weatherData.pressure_mb}
        </div>
        <div className='col pb-4'>
          <h5 className='mt-4 fw-bold'>Visibility</h5>
          {props.metric === "F" ? props.weatherData.visibility_mi : props.weatherData.visibility_km}
          <h5 className='mt-4 fw-bold'>UV Index</h5>
          {props.weatherData.uvIndex}
        </div>
        <div className='col pb-4'>
          <h5 className='mt-4 fw-bold'>Humidity</h5>
            {props.weatherData.humidity}%
          <h5 className='mt-4 fw-bold'>Precipitation</h5>
          {props.metric === "F" ? props.weatherData.precipitation_in : props.weatherData.precipitation_mm}
        </div>
      </div>
    </div>
  );
}



function App() {
  const [weatherData, setWeatherData] = useState({
    temp_f: "",
    temp_c: "",
    windSpeedDescription: "",
    feelsLike_f: "",
    feelsLike_c: "",
    clouds: "",
    icon: "",
    windSpeed_mph: "",
    windSpeed_kph: "",
    humidity: "",
    pressure_in: "",
    pressure_mb: "",
    visibility_mi: "",
    visibility_km: "",
    uvIndex: "",
    precipitation_in: "",
    precipitation_mm: "",
    hourlyData: {
      time: [],
      temp_f: [],
      temp_c: [],
      icon: [],
    },
    weekData: {
      date: [],
      tempHigh_f: [],
      tempLow_f: [],
      tempHigh_c: [],
      tempLow_c: [],
      icon: [],
      description: []
    }
  });

  // Init preferences
  const [preferences, setPreferences] = useState({
    background: !localStorage.getItem("preferences") ? "bg-light" : JSON.parse(localStorage.getItem("preferences")).background,
    text: !localStorage.getItem("preferences") ? "text-dark" : JSON.parse(localStorage.getItem("preferences")).text,
    location: !localStorage.getItem("preferences") ? "New York" : JSON.parse(localStorage.getItem("preferences")).location,
    metric: !localStorage.getItem("preferences") ? "F" : JSON.parse(localStorage.getItem("preferences")).metric
  });

  // Get weather from local storage
  // If no location saved, default to NY
  useEffect(() => {
    fetchWeather(preferences.location, preferences.metric, setWeatherData);
  }, [])

  // Display aside information
  const [display, setDisplay] = useState(false);

  return (
    <>
      <Aside preferences={preferences} setPreferences={setPreferences} display={display} setDisplay={setDisplay} />
      <div className={preferences.background + ' ' + preferences.text} style={display ? {display:"none"} : {display:"block"}}>
        <Navbar setDisplay={setDisplay} preferences={preferences} setPreferences={setPreferences} />
        <div className='container text-center mt-5 pb-5' style={{maxWidth:'900px'}}>
          <SearchBar preferences={preferences} setPreferences={setPreferences} setWeatherData={setWeatherData} />
          <div className='container p-5 mt-3 rounded'>
            <Primary metric={preferences.metric} weatherData={weatherData} />
            <Statistics metric={preferences.metric} weatherData={weatherData} />

            <h5 className='mt-5 mb-3'>Hourly Forecast</h5>
            <HourlyForecast metric={preferences.metric} hourlyData={weatherData.hourlyData} />

            <h5 className='mt-5 mb-4'>Weather this Week</h5>
            <WeekForcast metric={preferences.metric} weekData={weatherData.weekData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
