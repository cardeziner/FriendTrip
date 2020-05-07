import React, { useState, useEffect } from 'react'
import TripShow from './TripShow'


const TripShowContainer = (props) =>{
  const [trip, setTrip] = useState({})

  const tripId = props.match.params.id

  useEffect(() =>{
    fetch(`/api/v1/trips/${tripId}`, {
      credentials: "same-origin"
    })
    .then(response =>{
        if(response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`
            error = new Error(errorMessage)
          throw(error)
        }
      })
      .then(response => response.json())
      .then(parsedTrip => {
        setTrip(parsedTrip)
      })
      .catch(error => console.error(`Error in fetch: ${errorMessage}`))
    }, [])
    
  return(
    <div>
      <h1>Welcome back to {trip.name}!</h1>
      <TripShow
      trip={trip}
      />
    </div>

  )
}
export default TripShowContainer
