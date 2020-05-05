import React from 'react'
import { Link } from 'react-router-dom'

const TripTile = (props) =>{

  return(
    <div>
      <p className="header">
        <h3 className="header">
        {props.trip.name}
        </h3>
        {props.trip.start_date} - {props.trip.end_date}
      </p>
    </div>
  )
}

export default TripTile
