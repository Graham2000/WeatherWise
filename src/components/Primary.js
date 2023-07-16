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

export default Primary;