import React, { useState, useEffect } from 'react'

const WeatherComponent = (props) =>{
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [weatherData, setWeatherData] = useState({})



    const geocoder = new google.maps.Geocoder()
    const address = `${props.location}`
    geocoder.geocode( { 'address': address}, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        setLatitude(results[0].geometry.location.lat())
        setLongitude(results[0].geometry.location.lng())
       }
     })



    useEffect(() =>{
      fetch(`https://dark-sky.p.rapidapi.com/${longitute},${latitude}?lang=en&units=auto`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "26169f8158msh2412dd030a7ba8ep1feac3jsn87364f9e3c07",
		"x-rapidapi-host": "dark-sky.p.rapidapi.com"
	}
})
      .then(response => {
        debugger
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
      })
      .catch(error => console.error(`Error in fetch ${errorMessage}`))
    }, [])


  return(
    <div className="text-white">
      {latitude} {longitude}
      Hello World from Weather Component
    </div>
  )

}

export default WeatherComponent
