import React from 'react'
import { Link } from 'react-router-dom'

import GoogleMap from './GoogleMap'

const TripShow = props =>{


  const eventList = props.events.map(singleEvent =>{

    return(
      <div key={singleEvent.id} className="frame"><br/>
        <Link to={`/trips/${singleEvent.id}/events`} className="text">{singleEvent.name}</Link><br />
          <h5 className="font text-white">Day of Event : {singleEvent.date}</h5>
        <br/>
      </div>
    )
  })

  return(
    <div className="row">
    <div className="column font">
        <h3 className="font"> TRIP INFO </h3>
        <h4 className="font">
          {props.trip.city},{props.trip.state}
        </h4>
        <h1>
        {eventList}
        </h1>

        <Link to={`/trips/${props.trip.id}/events`} className="text">Visit your Events!</Link>
        <div className="text center">
        YOUR TRIP LOCATION
        </div>
    </div>
    </div>
  )
}

export default TripShow
