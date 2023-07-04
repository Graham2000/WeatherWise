const fetchWeather = (location, setWeatherData) => {
  // Set UV description
  const uvDescr = (index) => {
    if (index >= 0 && index <= 2) {
      return "Low";
    } else if (index >= 3 && index <= 5) {
      return "Moderate";
    } else if (index >= 6 && index <= 7) {
      return "High";
    } else if (index >= 8 && index <= 10) {
      return "Very high";
    } else if (index >= 11) {
      return "Extreme";
    }
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

  const getIconPath = (url) => {
    let path = url.split("//cdn.weatherapi.com/weather");
    return `images${path[1]}`;
  }

  const convertTime = (epoch) => {
    let hours = new Date(epoch * 1000).getHours();

    let ampm = hours >= 12 ? "PM" : "AM";

    if (hours > 12) {
      hours -= 12;
    }

    if (hours === 0) {
      hours = 12
    }

    return `${hours} ${ampm}`;
  }
  
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=b310be3a8dea452cb8723327230107&q=${location}&days=7&aqi=yes&alerts=no`)
      .then((res) => {
        if (res.ok) {
          res.json().then(data => {
            let windSpeedDescr = windDescr(Math.round(data.current.wind_mph));
            let iconPath = getIconPath(data.current.condition.icon);
            let index = uvDescr(data.current.uv) + `, ${data.current.uv}`;
            
            // Update weather information
            //console.log(data)

            // Hourly Forecast
            let currentTime = new Date().getTime();
            let hourlyForecast = data.forecast.forecastday[0];

            let hourlyData = {
              time: [],
              temp: [],
              icon: []
            }

            hourlyForecast.hour.forEach((hourData) => {
              // Only display hours after current timestamp
              if (hourData.time_epoch >= (currentTime / 1000)) {
                hourlyData.time.push(
                  convertTime(hourData.time_epoch)
                );
                hourlyData.temp.push(Math.round(hourData.temp_f));
                hourlyData.icon.push(hourData.condition.icon);
              }
            })
            
            setWeatherData(() => {
              return {
                temp: Math.round(data.current.temp_f),
                windSpeedDescription: windSpeedDescr,
                feelsLike: Math.round(data.current.feelslike_f),
                clouds: data.current.condition.text,
                icon: iconPath,
                windSpeed: Math.round(data.current.wind_mph) + "mph " + data.current.wind_dir,
                humidity: data.current.humidity,
                pressure: data.current.pressure_in,
                visibility: data.current.vis_miles + " miles",
                uvIndex: index,
                hourlyData: hourlyData,
              }
            })
            
          })
        } else {
          alert("Please enter a valid city")
        }
    })
}

export default fetchWeather;