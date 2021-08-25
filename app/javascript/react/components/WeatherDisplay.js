import React, {useState, useEffect} from 'react'
import cloudy from '../images/cloudy.png'
import clear from '../images/clear.png'
import partly from '../images/partly-cloudy.png'
import rain from '../images/rain.png'
import sleet from '../images/sleet.png'
import snow from '../images/snow.png'

const WeatherDisplay = (props) =>{

  if( 0 > props.longitude > 0){
    const [icon, setIcon] = useState("")
    const [currentWeather, setCurrentWeather] = useState({})
    const [dailyWeather, setDailyWeather] = useState({})
    const [forecastData, setForecastData] = useState([])

      useEffect(() =>{
        fetch(`https://dark-sky.p.rapidapi.com/${props.latitude},${props.longitude}?lang=en&units=auto`, {
	         "method": "GET",
	         "headers": {
		           "x-rapidapi-host": "dark-sky.p.rapidapi.com",
		           "x-rapidapi-key": "26169f8158msh2412dd030a7ba8ep1feac3jsn87364f9e3c07"
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
          setCurrentWeather(parsedWeatherData.currently)
          setDailyWeather(parsedWeatherData.daily)
          setForecastData(parsedWeatherData.daily.data)

        })
        .catch(error => console.error(`Error in fetch ${errorMessage}`))
      }, [])

      const weeklyForecast = forecastData.map(day =>{
        let date = new Date(day.time)
        date = date.toString().split(" ")
        let dateString = date[1] + " " + date[2] + " " + date[3]
        return(
          <div key={day.time} className="row">
            <div className="col-4 center">
              {dateString}
            </div>
            <div className="col-8 center">
              {day.summary}
            </div>
          </div>
        )
      })

      let imageURL = ""


      if(dailyWeather.icon){

        if(status.includes("clear")){
          imageURL = clear
        }
        if(status.includes("rain")){
          imageURL = rain
        }
        if(status.includes("partly")){
          imageURL = partly
        }
        if(status.includes("sleet")){
          imageURL = sleet
        }
        if(status.includes("snow")){
          imageURL = snow
        }
        if(status.includes("cloudy")){
          imageURL = cloudy
        }

      }else{
        imageURL = sleet
      }

      // partly cloudy, mostly cloudy, clear, possible light rain, humid and overcast, clear, possible light rain and humid, overcast,
// clear-day, rain, partly-cloudy day, sleet, snow, cloudy

    return(
      <div>
        <img src={imageURL}/>
        <h5 className="text-white center">CURRENT TEMP</h5>
        <h1 className="text-white center">

          {currentWeather.apparentTemperature}° F
        </h1>
        <h5 className="text-white center">Current weather in {props.city} is {currentWeather.summary}</h5>
        <p className="text-yellow center">"{dailyWeather.summary}"</p>
        <div className="inline-block row">
          <div className="col-6 center">

          </div>
          <div className="col-6 center">

          </div>
        </div>
      </div>
    )
  }else{
    return(
      <div className="text-white center">LOADING...PLEASE WAIT</div>
    )
  }
}

export default WeatherDisplay
