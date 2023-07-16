const Statistics = (props) => {
    return (
      <div className='border rounded p-4 mt-5 text-center'>
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

export default Statistics;