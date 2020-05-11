import React, { useState, useEffect } from 'react'
import GoogleMap from './GoogleMap'

import TripShow from './TripShow'


const TripShowContainer = (props) =>{
  const [trip, setTrip] = useState({})
  const [tripEvents, setTripEvents] = useState([])
  const [users, setUsers] = useState([])

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
        setUsers(parsedTrip.users)

      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }, [])

  return(
    <div>
      <h5 className="text green frame center">GET EXITED FOR:</h5><h1 className="text center">{trip.name}</h1>
        <TripShow
        trip={trip}
        events={tripEvents}
        users={users}
        />

    </div>
  )

}
export default TripShowContainer
