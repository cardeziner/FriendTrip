import React from 'react'
import { Link } from 'react-router-dom'

const TripTile = (props) =>{

  return(
    <div>
      <h3 className="text">
        <Link to={`/trips/${props.trip.id}`}>{props.trip.name}</Link>
        </h3>
        <p>Click to access events vote page for this</p>
    </div>
  )
}

export default TripTile
