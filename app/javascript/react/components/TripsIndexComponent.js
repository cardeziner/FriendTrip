import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BackdropFilter from "react-backdrop-filter";
import TripShowContainer from './TripShowContainer'
import TripTile from './TripTile'
import trips_logo from '../../../assets/images/trips-icon.png'
import TripShow from './TripShow'

const TripsIndexComponent = (props) =>{
  const [trips, setTrips] = useState([])
  const [user, setUser] = useState({})
  const [imageUrl, setImageUrl] = useState({})

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

  useEffect(() =>{
    fetch('/api/v1/users', {
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
      setUser(parsedTripData.user)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

//unsplash api
  useEffect(() =>{
    fetch('https://api.unsplash.com/search/photos/?client_id=_0SUzohG1CVcvSuRoQCWkvAZr0UAuFoP0UzND3O0i2g&query=trip', {
      credentials: "same-origin",
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
    .then(parsedData =>{
      setImageUrl(parsedData.results[Math.floor(Math.random() * parsedData.results.length)].urls.full)
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
    }
  )

  function noTripCheck() {
    if (trips.length < 1){
      return(
        <div>
          <br/><br/>
          <h2 className="text-white">
            YOU CURRENTLY HAVE NO ACTIVE FRIENDTRIPS!
          </h2>
          <br/><br/>
        </div>
      )
    }
  }

  return(
      <div className="home-bg">
        <div className="row pad">
        <h1 className="col-12 center font vert no-bot-pad">Hello {user.first_name}!</h1>
        </div>
        <div className="front">
          <div className="row bot-pad">
            <div className="col-xs-10 col-md-5 bord">
              <BackdropFilter
              className="bord"
              filter={"blur(15px)"}
              >
              <div className="opac-black">
              <img className="icon" src={trips_logo}/><h1 className="yellow-title vert">MY TRIPS</h1>
              </div>
              <br/>
              <div className="center">
                {tripList}{noTripCheck()}
                </div>
              </BackdropFilter>
            </div>
            <div className="col-xs-8 col-md-5 float">
              <div className="fifty">
                <BackdropFilter
                className="bord"
                filter={"blur(15px)"}
                >
                <div className="no-dec center">
                  <Link to='trips/new' className="no-dec">
                  <h1 className="inline sides-pad text-yellow big">+</h1>
                  <h1 className="inline no-dec text-yellow center">NEW FRIENDTRIP</h1>
                  </Link>
                </div>
                <br/>
                </BackdropFilter>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default TripsIndexComponent
