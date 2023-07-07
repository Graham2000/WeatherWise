import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';


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

  // Convert 24hr to local time
  const convertTime = (time) => {
    let hours = time;

    let ampm = hours >= 12 ? "PM" : "AM";

    if (hours > 12) {
      hours -= 12;
    }

    if (hours === 0) {
      hours = 12
    }

    return `${hours} ${ampm}`;

    /*
    let hours = new Date(epoch * 1000).getHours();

    let ampm = hours >= 12 ? "PM" : "AM";

    if (hours > 12) {
      hours -= 12;
    }

    if (hours === 0) {
      hours = 12
    }

    return `${hours} ${ampm}`;*/
  }

  // Retrieve hour from time and convert to type Num
  let convertHour = (hourStr) => {
    let num = "";
    for (let str of hourStr) {
      if (str === ":") break;
      num += str;
    }

    return Number(num);
  }

  // Parse date retrieved from API for Temporal conversion
  let parseDate = (dateStr) => {
    let date = [];

    let dateComponents = dateStr.split("-");
    let year = dateComponents[0];
    let month = dateComponents[1];
    let day = dateComponents[2];

    date.push(year);

    // Remove leading zero from month and day
    if (month[0] == "0") {
      month = month.slice(1);
    }

    if (day[0] == "0") {
      day = day.slice(1);
    }

    date.push(month);
    date.push(day);

    return date;
  }

  //convert date
  let getDayOfWeek = (pDate) => {
    //console.log(pDate)
    // Get day of week given a month, day, and year
    const monthDay = Temporal.PlainMonthDay.from({ month: pDate[1], day: pDate[2] }); // => 07-14
    const date = monthDay.toPlainDate({ year: pDate[0] }); // => 2030-07-14

    let day = date.dayOfWeek;
    if (day == 1) {
      return "Monday";
    } else if (day == 2) {
      return "Tuesday";
    } else if (day == 3) {
      return "Wednesday";
    } else if (day == 4) {
      return "Thursday";
    } else if (day == 5) {
      return "Friday";
    } else if (day == 6) {
      return "Saturday";
    } else {
      return "Sunday";
    }
  }

  let getMonth = (pDate) => {
    let month = pDate[1];

    if (month == 1) {
      return "Jan";
    } else if (month == 2) {
      return "Feb";
    } else if (month == 3) {
      return "March";
    } else if (month ==4) {
      return "April";
    } else if (month == 5) {
      return "May";
    } else if (month == 6) {
      return "June";
    } else if (month == 7) {
      return "Jul";
    } else if (month == 8) {
      return "Aug";
    } else if (month == 9) {
      return "Sep";
    } else if (month == 10) {
      return "Oct";
    } else if (month == 11) {
      return "Nov";
    } else {
      return "Dec";
    }
  }

  // Return formatted date
  let formatDate = (pDate, dayOfWeek, month) => {
    return `${dayOfWeek}, ${month} ${pDate[2]}`
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
            let hourlyForecastDay1 = data.forecast.forecastday[0];
            let hourlyForecastDay2 = data.forecast.forecastday[1];

            let hourlyData = {
              time: [],
              temp: [],
              icon: []
            }

            let weekData = {
              date: [],
              tempHigh: [],
              tempLow: [],
              icon: [],
              description: []
            }






            /////
            // Get day of week given a month, day, and year
            //const monthDay = Temporal.PlainMonthDay.from({ month: 7, day: 2 }); // => 07-14
            //const date = monthDay.toPlainDate({ year: 2023 }); // => 2030-07-14
            //console.log("test", date.dayOfWeek)
            /////



            let localHour = convertHour(data.location.localtime.split(" ")[1]);

            // Add hourly forecast for current day after current time
            hourlyForecastDay1.hour.forEach((hourData) => {
              let forecastHour = convertHour(hourData.time.split(" ")[1]);
              if (forecastHour > localHour) {
                hourlyData.time.push(
                  convertTime(forecastHour)
                );
                hourlyData.temp.push(Math.round(hourData.temp_f));
                hourlyData.icon.push(hourData.condition.icon);
              }
            })

            // Add next day hourly forecast after previous expires
            hourlyForecastDay2.hour.forEach((hourData) => {
              let forecastHour = convertHour(hourData.time.split(" ")[1]);
              hourlyData.time.push(
                convertTime(forecastHour)
              );
              hourlyData.temp.push(Math.round(hourData.temp_f));
              hourlyData.icon.push(hourData.condition.icon);
            })

            // Get week data
            data.forecast.forecastday.forEach((forecastDay) => {
              // convert day!!
              // Parse day
              let parsedDate = parseDate(forecastDay.date);
              let dayOfWeek = getDayOfWeek(parsedDate)
              //console.log(dayOfWeek)
              let month = getMonth(parsedDate);
              let formattedDate = formatDate(parsedDate, dayOfWeek, month);
              weekData.date.push(formattedDate);

              //weekData.date.push(parseDate(forecastDay.date));
              //console.log(parseDate(forecastDay.date))
              weekData.tempHigh.push(Math.round(forecastDay.day.maxtemp_f));
              weekData.tempLow.push(Math.round(forecastDay.day.mintemp_f));
              weekData.icon.push(forecastDay.day.condition.icon);
              weekData.description.push(forecastDay.day.condition.text);
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
                precipitation: data.current.precip_in,
                weekData: weekData
              }
            })
            
          })
        } else {
          alert("Please enter a valid city")
        }
    })
}

export default fetchWeather;