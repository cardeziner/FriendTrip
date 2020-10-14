import React from 'react'
import { Link } from 'react-router-dom'

const TripTile = (props) =>{

  return(
    <div>
      <h3 className="text items-body-content middle">
        <Link to={`/trips/${props.trip.id}`} className="accent-red center">{props.trip.name}</Link>
        </h3>
    </div>
  )
}

export default TripTile
