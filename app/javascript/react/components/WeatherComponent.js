import React, { useState, useEffect } from 'react'

const WeatherComponent = (props) =>{
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  useEffect(() => {
    const geocoder = new google.maps.Geocoder()
    const address = `${props.location}`
    geocoder.geocode( { 'address': address}, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        setLatitude(results[0].geometry.location.lat())
        setlongitude(results[0].geometry.location.lng())
       }
     })
    })


  return(
    <div className="text-white">
      {latitude}
      Hello World from Weather Component
    </div>
  )
}

export default WeatherComponent
