const WeekForcast = (props) => {
    let day = props.weekData.date.map((date, i) => {
        return (
            <div key={i}>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-5 col-lg text-end ps-4'>
                        {date}<br></br>
                        <span className="fw-light">{props.weekData.description[i]}</span>
                    </div>

                    <div className="col text-end m-0 p-0">
                        <img src={props.weekData.icon[i]} style={{height:'40px'}} className="ms-3"></img>

                    </div>

                    <div className="col text-start">

                        {props.metric === "F" ? props.weekData.tempHigh_f[i] : props.weekData.tempHigh_c[i]}° {  }
                        <br></br>
                        <span className="fw-light">
                            {props.metric === "F" ? props.weekData.tempLow_f[i] : props.weekData.tempLow_c[i]}°
                        </span>

                    </div>
                </div>
                <hr></hr>
            </div>
        );
    })



    return (
        <>
        <hr></hr>
        {day}
        </>
    );
}

export default WeekForcast;