import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BackdropFilter from "react-backdrop-filter";
import GoogleMapTile from './GoogleMapTile'
import trip_info from '../../../assets/images/trip-info.png'
import location from '../../../assets/images/location.png'
import dates from '../../../assets/images/dates.png'
import friends from '../../../assets/images/friends.png'
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

    const length = props.users.length

  const userList = props.users.map(member =>{
    return(
        <h3 key={member.id} className="text green center block">
        {member.first_name}
        </h3>
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
  height: '100%',
  position: 'absolute',
  backgroundSize: 'cover',
  boxShadow: 'inset 0 7px 9px -7px black',
}

  return(
    <div className="bg" style={sectionStyle}>
      <h1 className="font center accent-red">{props.trip.name}</h1>
      <div className="row">
        <div key={props.trip.id} className="col-xs-12 col-md-5 font">
          <h1 className="text-white vert left-blue pad left"> TRIP INFO </h1>
          <BackdropFilter
          className="bord opac-black"
          filter={"blur(20px)"}
          >
          <h2 className="text-white">
          <img src={location} className="icon"/>
          <div className="vert-line"></div>{props.trip.city}<div className="right">
            <GoogleMapTile
            id={props.trip.id}
            location={tripCity}
            trip={props.trip}
            />
          </div>
          </h2>
          <h2 className="text-white no-wrap inline vert"><img src={dates} className="icon"/>{props.trip.start_date} - {props.trip.end_date}</h2>
          <hr className="line vert"/>
          <h3 className="text-white center vert"><img src={friends} className="icon" />{blankUser()}</h3>
          <hr className="gray-line"/>
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
              <Link to={`/trips/${props.trip.id}/events`} className="text button"><h5 className="text"> CLICK HERE TO ADD &</h5>VOTE ON NEW EVENTS</Link>
            </div>
            </BackdropFilter>
        </div>
      </div>
      <br></br>
      <p className="center"><Link to="/trips" className="font">Back to Trips</Link></p>
    </div>
  )
}

export default TripShow
