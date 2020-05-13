import React from 'react'
import { Link } from 'react-router-dom'

import GoogleMap from './GoogleMap'

const TripShow = props =>{

  const eventList = props.events.map(singleEvent =>{
    if(singleEvent.votes > props.users.length){
    return(
      <div key={singleEvent.id}><br/>
        <Link to={`/trips/${singleEvent.id}/events`} className="submit">{singleEvent.name}</Link><br />
        <p className="green text">Day of Event : {singleEvent.date}</p>
        <br/>

      </div>
    )}
  })

  const userList = props.users.map(user =>{
    return(
      <p className="text">{user.name}</p>
    )
  })

  return(
    <div className="row">
      <div className="column font">
        <h1 className="accent-red"> TRIP INFO </h1>
        <h4>
          LOCATION:
          {props.trip.city}
        <GoogleMap
        city={props.trip.city}
        state={props.trip.state}
        />
        {userList}
        </h4>
      </div>
      <div className="column text center">
        <h1 className="accent-red text-right">TRIP ITINERARY</h1>
        <h4></h4>
        <h1>
        {eventList}
        </h1>
        <Link to={`/trips/${props.trip.id}/events`} className="text">VOTE ON NEW EVENTS</Link>
      </div>
    </div>
  )
}

export default TripShow
