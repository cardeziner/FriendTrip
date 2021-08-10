import React, { useState, useEffect } from 'react'

const WeatherComponent = (props) =>{
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)


  return(
    <div className="text-white">
      Hello World from Weather Component
    </div>
  )
}

export default WeatherComponent
