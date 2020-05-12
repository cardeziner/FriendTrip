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
      id={trip.id}
      trip={trip}
      />
    )
  })


  return(
    <div className="column">
      <h1 className="text">Welcome Back!{user.name}</h1>
      {tripList}
      <Link to="/trips/new" className="text">Add a new FriendTrip</Link>
    </div>
  )
}

export default TripsIndexComponent
