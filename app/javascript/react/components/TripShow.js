import React from 'react'
import { Link } from 'react-router-dom'

import GoogleMapTile from './GoogleMapTile'

const TripShow = props =>{

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
            location={props.trip.city}
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
        <h1>
        {eventList}
        </h1><br/>
        <Link to={`/trips/${props.trip.id}/events`} className="text button"><h5 className="text"> CLICK HERE TO ADD &</h5>VOTE ON NEW EVENTS</Link>
      </div>
    </div>
  )
}

export default TripShow
