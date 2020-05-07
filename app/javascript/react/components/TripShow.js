import React from 'react'

const TripShow = props =>{
  return(
    <div>
      <h3>
        {props.trip.city},{props.trip.state}
      </h3>
    </div>
  )
}

export default TripShow
