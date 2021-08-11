import React, {useState, useEffect} from 'react'

const WeatherDisplay = (props) =>{

  if( 0 > props.longitude > 0){
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


    return(
      <div> {weather.summary}</div>
    )
  }else{
    return(
      <div>loading please wait</div>
    )
  }
}

export default WeatherDisplay
