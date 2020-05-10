import React, { useState, useEffect } from 'react'


import TripShow from './TripShow'


const TripShowContainer = (props) =>{
  const [trip, setTrip] = useState({})
  const [tripEvents, setTripEvents] = useState([])

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
        setTrip(parsedTrip.trip)
        setTripEvents(parsedTrip.events)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }, [])

  return(
    <div>
      <h1 className="font">GET EXITED FOR: {trip.name}</h1>
        <TripShow
        trip={trip}
        events={tripEvents}
        />
    </div>
  )

}
export default TripShowContainer
