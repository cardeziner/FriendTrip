import React, {useState, useEffect} from 'react'

const WeatherDisplayTile = (props) =>{

  if(props.longitude){
    const [weather, setWeather] = useState({})
      useEffect(() =>{
        fetch(`https://dark-sky.p.rapidapi.com/${props.latitude},${props.longitude}?lang=en&units=auto`, {
  	       "method": "GET",
  	       "headers": {
  		         "x-rapidapi-key": "26169f8158msh2412dd030a7ba8ep1feac3jsn87364f9e3c07",
  		         "x-rapidapi-host": "dark-sky.p.rapidapi.com"
  	          }
            })
        .then(response => {
          if(response.ok) {
            return response
          } else {
            let errorMessage = `${response.statusText} (${response.statusText})`
            error = new Error(errorMessage)
            throw(error)
          }
        })
        .then(response => response.json())
        .then(parsedWeatherData =>{
          setWeather(parsedWeatherData.currently)
        })
        .catch(error => console.error(`Error in fetch ${errorMessage}`))
      }, [])

      // partly cloudy, mostly cloudy, clear, possible light rain, humid and overcast, clear, possible light rain and humid, overcast,
// clear-day, rain, partly-cloudy day, sleet, snow, cloudy

    return(
      <div className="inline vert">
        <h5 className="font center inline vert">High of {Math.round(weather.apparentTemperature)}° & {weather.summary} </h5>
      </div>
    )
  }else{
    return(
      <div className="text-white center inline">LOADING...PLEASE WAIT</div>
    )
  }
}

export default WeatherDisplayTile
