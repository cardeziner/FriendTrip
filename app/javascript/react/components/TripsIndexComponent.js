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
      <div key={trip.id}>
      <TripTile
      id={trip.id}
      trip={trip}
      />
      </div>
    )
  })

  return(
      <div className="column-center">
        <div className="center">
          <h1 className="font green">Welcome Back!{user.first_name}</h1>
          <p className="line"></p>
          <h5 className="font green center">Click on any trip below to begin</h5>
          {tripList}
        </div>
          <p className="line"></p>
          <p className="center"> <Link to="/trips/new" className="font">Add a new FriendTrip</Link></p>
      </div>
  )
}

export default TripsIndexComponent
