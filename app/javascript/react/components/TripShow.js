import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BackdropFilter from "react-backdrop-filter";
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
    fetch(`https://api.unsplash.com/search/photos/?client_id=_0SUzohG1CVcvSuRoQCWkvAZr0UAuFoP0UzND3O0i2g&query=${props.trip.city}`, {
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

  var sectionStyle = {
  backgroundImage: `url(${imageUrl})`,
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  position: 'absolute',
  backgroundSize: 'cover',
  boxShadow: 'inset 0 7px 9px -7px black',
  paddingBottom: '0'
}

  return(
    <div className="bg" style={sectionStyle}>
      <h1 className="font center accent-red">{props.trip.name}</h1>
      <div className="row">
        <div key={props.trip.id} className="col-5 font">
        <h1 className="accent-red"> TRIP INFO </h1>
        <BackdropFilter
        className="bord"
        filter={"blur(20px)"}
        >
        <h2 className="text-blue">{props.trip.city}</h2><p className="text-green">({props.trip.start_date} through {props.trip.end_date})</p>
          <div>
            <GoogleMapTile
            id={props.trip.id}
            location={tripCity}
            trip={props.trip}
            />
            <br/><br/>
            <h2 className="text-blue center">FRIENDS ON THIS TRIP</h2>
            <div className="center">
            {blankUser()}
          </div>
          <p className="center"><Link to="/trips" className="font">Back to Trips</Link></p>
        </div>
        </BackdropFilter>
      </div>
        <div className="col-5">
        <h1 className="text-blue text-right">TRIP ITINERARY</h1>
      <BackdropFilter
      className="bord"
      filter={"blur(20px)"}
      >
      <div className="text center opac">
        <h1>{tripCity}</h1>
        {eventList}
        <br/>
        <Link to={`/trips/${props.trip.id}/events`} className="text button"><h5 className="text"> CLICK HERE TO ADD &</h5>VOTE ON NEW EVENTS</Link>
      </div>
      </BackdropFilter>
      </div>
      </div>
    </div>
  )
}

export default TripShow
