import fetchWeather from "../hooks/FetchWeather";

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

export default SearchBar;