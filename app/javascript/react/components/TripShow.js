import React from 'react'
import { Link } from 'react-router-dom'

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
    <div>
        <h4>
          {props.trip.city},{props.trip.state}
        </h4>
        <h1>
        {eventList}
        </h1>
    </div>
  )
}

export default TripShow
