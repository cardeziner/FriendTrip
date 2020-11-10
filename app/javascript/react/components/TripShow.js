import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import GoogleMapTile from './GoogleMapTile'

import Unsplash from 'unsplash-js'


const TripShow = props =>{
  const [imageUrl, setImageUrl] = useState([])
  const [tripCity, setTripCity] = useState()

  const iD = (props.id - 1)

  useEffect(() =>{
    fetch(`/api/v1/trips/${props.id}`, {
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
    .then(parsedTripsData =>{
      setTripCity(parsedTripsData.trip.city)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])


  useEffect(() =>{
    fetch(`https://api.unsplash.com/search/photos/?client_id=_0SUzohG1CVcvSuRoQCWkvAZr0UAuFoP0UzND3O0i2g&query=${tripCity}`, {
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

  const eventList = props.events.map(singleEvent =>{
    if(singleEvent.votes > props.users.length){
      return(
        <div key={singleEvent.id} ><br/>
          <Link to={`/trips/${singleEvent.id}/events`} className="submit">{singleEvent.name}</Link><br />
          <h5 className="submit-blue"> {singleEvent.date} </h5>
          <br/>
        </div>
      )}
    })

  const userList = props.users.map(member =>{
    return(
      <div key={member.id}>
        <h3 className="text green">
        {member.first_name}
        </h3>
      </div>
    )
  })

  function blankUser(){
    if(userList.length < 1){
      return(
        <div className="text-yellow">
        NO USERS HAVE BEEN ADDED TO THIS TRIP YET!
        </div>
      )
    } else {
      return(
        <div>
        {userList}
        </div>
      )
    }
  }

  return(
    <div className="row">
      <div  key={props.trip.id} className="column font">
        <h1 className="accent-red"> TRIP INFO </h1>
        <h2 className="text-blue">{props.trip.city}</h2><p className="text-green">({props.trip.start_date} through {props.trip.end_date})</p>
          <div>
            <GoogleMapTile
            id={props.trip.id}
            location={tripCity}
            trip={props.trip}
            />
            <br/><br/>
            <h2 className="text-blue center">FRIENDS ON THIS TRIP</h2>
            <div className="square center">
            {blankUser()}
          </div>
          <p className="center"><Link to="/trips" className="font">Back to Trips</Link></p>
        </div>

      </div>
      <div className="column text center">
        <h1 className="text-blue text-right">TRIP ITINERARY</h1>
        <h4></h4>
        <img src={imageUrl}/>
        <h1>{tripCity}</h1>
        {eventList}
        <br/>
        <Link to={`/trips/${props.trip.id}/events`} className="text button"><h5 className="text"> CLICK HERE TO ADD &</h5>VOTE ON NEW EVENTS</Link>
      </div>
    </div>
  )
}

export default TripShow
