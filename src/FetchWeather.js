const fetchWeather = (location, setWeatherData) => {
      // Convert cloud coverage to inital caps
  const convertCase = (descr) => {
    let description = [...descr];
    for (let i = 0; i < description.length; i++) {
      if (i === 0) {
        description[i] = description[i].toUpperCase();
      } else if (description[i] === " ") {
        description[i + 1] = description[i + 1].toUpperCase();
      }
    }

    return description;
  }

  // Determine wind speed description
  const windDescr = (speed) => {
    if (speed < 1) {
      return "Calm";
    } else if (speed >= 1 && speed <= 3) {
      return "Light air"
    } else if (speed >= 4 && speed <= 7) {
      return "Light breeze"
    } else if (speed >= 8 && speed <= 12) {
      return "Gentle breeze";
    } else if (speed >= 13 && speed <= 18) {
      return "Moderate breeze";
    } else if (speed >= 19 && speed <= 24) {
      return "Fresh breeze";
    } else if (speed >= 25 && speed <= 31) {
      return "Strong breeze";
    } else if (speed >= 32 && speed <= 38) {
      return "High wind";
    } else if (speed >= 39 && speed <= 46) {
      return "Gale";
    } else if (speed >= 41 && speed <= 47) {
      return "Strong gale";
    } else if (speed >= 48 && speed <= 55) {
      return "Storm";
    } else if (speed >= 64 && 72 <= 72) {
      return "Violent storm";
    } else if (speed >= 73) {
      return "Hurricane-force";
    } 

  }
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=18190a28c8d812d9dc3714989488cdfb&units=imperial`)
      .then((res) => {
        if (res.ok) {
          res.json().then(data => {

            let cl = convertCase(data.weather[0]["description"]);
            let windSpeedDescr = windDescr(data.wind.speed);
            
            // Update weather information
            setWeatherData(() => {
              return {
                temp: Math.round(data.main.temp),
                windSpeedDescription: windSpeedDescr,
                feelsLike: Math.round(data.main.feels_like),
                clouds: cl,
                icon: data.weather[0]["icon"],
                windSpeed: Math.round(data.wind.speed),
                humidity: data.main.humidity,
                pressure: data.main.pressure
              }
            })
     
          })
        } else {
          alert("Please enter a valid city")
        }
    })
}

export default fetchWeather;