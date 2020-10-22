import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BackdropFilter from "react-backdrop-filter";
import TripShowContainer from './TripShowContainer'
import TripTile from './TripTile'
import trips_logo from '../../../assets/images/trips-icon.png'

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
      <div className="home-bg">
        <div className="row center">
        <div className="col-5">
          <BackdropFilter
          filter={"blur(10px)"}
          >
          <img className="icon" src={trips_logo}/><h1 className="yellow-title">MY TRIPS</h1>
          <div className="center">
          {tripList}
          </div>
        </BackdropFilter>
      </div>
        <div className="col-5">
          <h1 className="white">Hello</h1>
        </div>
          <p className="line"></p>
          <p className="center"> <Link to="/trips/new" className="font">Add a new FriendTrip</Link></p>
        </div>
      </div>
  )
}

export default TripsIndexComponent
