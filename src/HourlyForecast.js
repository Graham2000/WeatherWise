import { useEffect } from "react";

// issue with async await
const HourlyForecast = (props) => {
  let weatherCard = props.hourlyData.time.map((time, i) => {
    return (
      <div key={i} className="weatherCard">
        <p>{props.metric === "F" ? props.hourlyData.temp_f[i] : props.hourlyData.temp_c[i]}°</p>
        <img className="m-3" src={props.hourlyData.icon[i]}></img>
        <p>{time}</p>
      </div>
    );
  })

  return (
    <>
        <div style={{display:'flex', flexDirection:'row', overflowX:'scroll', width:'100%'}}>
          {weatherCard}
        </div>
    </>
  );
}

export default HourlyForecast;