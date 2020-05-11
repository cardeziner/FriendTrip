import React from 'react'
import { Link } from 'react-router-dom'


const TripShow = props =>{

  const eventList = props.events.map(singleEvent =>{

    return(
      <div key={singleEvent.id} className="frame"><br/>
        <Link to={`/trips/${singleEvent.id}/events`} className="text">{singleEvent.name}</Link><br />
          <h5 className="text">Day of Event : {singleEvent.date}</h5>
        <br/>
      </div>
    )
  })
  const userList = props.users.map(member =>{
    return(
      <div>
        <h3 className="text">
        {member.first_name}
        </h3>
      </div>
    )
  })
  return(
    <div>
        <h2 className="text"> TRIP DETAILS </h2>
        <div className="column frame">
        <h2 className="text">{props.trip.city},{props.trip.state}</h2>
        <h4 className="text">
          {props.trip.start_date} - {props.trip.end_date}
        </h4><br/>

        <h2 className="text">TripFriends </h2>
          <h2>
          {userList}
          </h2>

        </div>
        <div className="column">
        <h1>
        {eventList}

        </h1>
        <Link to={`/trips/${props.trip.id}/events`} className="text">All Events For This Trip</Link><br />
        </div>
    </div>
  )
}

export default TripShow
