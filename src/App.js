import logo from './logo.svg';
import { useEffect, useState } from 'react';
import fetchWeather from './hooks/FetchWeather';
import HourlyForecast from './components/HourlyForecast';
import WeekForcast from './components/WeekForecast';
import Navbar from './components/Navbar';
import Aside from './components/Aside';
import SearchBar from './components/SearchBar';
import Primary from './components/Primary';
import Statistics from './components/Statistics';

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
