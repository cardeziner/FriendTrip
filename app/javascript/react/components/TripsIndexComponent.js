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
        <div className="row pad">
        <div className="col-6">
          <BackdropFilter
          filter={"blur(15px)"}
          background-color={"black"}
          opacity={".5"}
          border-radius={"10px"}
          >
          <img className="icon vert" src={trips_logo}/><h1 className="yellow-title">MY TRIPS</h1>
          <hr className="gray-line"/>
          <h1>{user.first_name}</h1>
          <div className="center">
          {tripList}
          </div>
          <hr className="gray-line"/>
          <p className="center"> <Link to="/trips/new" className="font">Add a new FriendTrip</Link></p>
        </BackdropFilter>
      </div>
        <div className="col-5">
        <BackdropFilter
        filter={"blur(15px)"}
        background-color={"black"}
        opacity={".5"}
        border-radius={"10px"}
        >
        <img className="icon vert" src={trips_logo}/><h1 className="yellow-title">MY TRIPS</h1>
        <hr className="gray-line"/>
        <div className="center">
        {tripList}
        </div>
        <hr className="gray-line"/>
        <p className="center"> <Link to="/trips/new" className="font">Add a new FriendTrip</Link></p>
      </BackdropFilter>
        </div>
          <p className="line"></p>
        </div>
      </div>
  )
}

export default TripsIndexComponent
