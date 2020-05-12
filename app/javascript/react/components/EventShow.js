import React from 'react'
import EventsList from './EventsList'

const EventShow = (props) =>{

  const eventList = props.events.map(singleEvent =>{
      if(singleEvent.votes > (props.users.length / 2)){
    return(
      <div className="text center column">
        <h1 className="font">{singleEvent.name}</h1>
          <div className="frame">
            <h3 className="text"> Date of event: {singleEvent.date}</h3>
            <h3 className="text"> Location: {singleEvent.location}</h3>
        </div>
      </div>
    )}
  })

  return(
    <div>
      {eventList}
    </div>
  )
}

export default EventShow
