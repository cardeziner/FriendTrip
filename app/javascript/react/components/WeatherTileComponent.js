import React, { useState, useEffect } from 'react'
import WeatherDisplayTile from './WeatherDisplayTile'

const WeatherTileComponent = (props) =>{
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [weatherData, setWeatherData] = useState({})

  if(props.city){
  useEffect(() => {
    const geocoder = new google.maps.Geocoder()
    const address = `${props.city}`
    geocoder.geocode( { 'address': address}, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        setLatitude(results[0].geometry.location.lat())
        setLongitude(results[0].geometry.location.lng())
       }
     })
    })

  return(
    <div className="text-white">
      <WeatherDisplayTile
        longitude={longitude}
        latitude={latitude}
        city={props.city}
        />
    </div>
  )
}else{
  return(<div>error</div>)
}
}

export default WeatherTileComponent
