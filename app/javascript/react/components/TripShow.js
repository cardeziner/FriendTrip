import React from 'react'
import { Link } from 'react-router-dom'

import GoogleMap from './GoogleMap'

const TripShow = props =>{


  const eventList = props.events.map(singleEvent =>{

    return(
      <div key={singleEvent.id} className="frame"><br/>
        <Link to={`/trips/${singleEvent.id}/events`}>{singleEvent.name}</Link><br />
          <h5>Day of Event : {singleEvent.date}</h5>
        <br/>
      </div>
    )
  })

  return(
    <div className="column">
        <h2 className="font"> TRIP INFO </h2>
        <h4>
          {props.trip.city},{props.trip.state}
        </h4>
        <h1>
        {eventList}
        </h1>

        <Link to={`/trips/${props.trip.id}/events`} className="text">Visit your Events!</Link>

        <div className="column">
        <GoogleMap
        location={props.trip.location}
        />
        </div>
    </div>
  )
}

export default TripShow
