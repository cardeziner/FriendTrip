import React, { useState, useEffect } from 'react'

import TripTile from './TripTile'

const TripsIndexComponent = (props) =>{
  const [trips, setTrips] = useState([])

  useEffect(() =>{
    fetch('/api/v1/trips', {
      credentials: "same-origin"
    })
    .then(response => {
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedTripData =>{
      setTrips(parsedTripData)
    })
    .catch(error => console.error(`Error in fetch: ${errorMessage}`))
  }, [])



  const tripList = trips.map(trip =>{
    return (
      <TripTile
      key={trip.id}
      trip={trip}
      />
    )
  })

  return(
    <div>
      {tripList}
    </div>
  )
}

export default TripsIndexComponent
