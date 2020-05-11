import React from 'react'
import { Link } from 'react-router-dom'

const TripTile = (props) =>{

  return(
    <div className="medium-3 center">
      <h3 className="text">
        <Link to={`/trips/${props.trip.id}`}>{props.trip.name}</Link>
        </h3>
        <p className="text">{props.trip.start_date} - {props.trip.end_date}</p><br/>
    </div>
  )
}

export default TripTile
