import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import TripShowContainer from './TripShowContainer'
import TripTile from './TripTile'

const TripsIndexComponent = (props) =>{
  const [trips, setTrips] = useState([])
  const [user, setUser] = useState({})


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
    .catch(error => console.error(`Error in fetch: ${error.message}`))
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
      <h1 className="text center frame">Welcome Back!</h1>
      <div className="column frame center">
      <h2 className="text">Upcoming FriendTrips</h2>
      {tripList}

      <Link to="/trips/new" className="text">Add a new FriendTrip</Link>
      </div>
    </div>
  )
}

export default TripsIndexComponent
