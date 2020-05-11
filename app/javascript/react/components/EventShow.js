import React from 'react'

import EventsList from './EventsList'

const EventShow = (props) =>{

  const eventList = props.events.map(singleEvent =>{

    if(singleEvent.votes > (props.events.length / 2)){
      return(
      <div class="column text">
        <h2 class="font">{singleEvent.name}</h2>
          <div class="frame">
            <h4 class="text"> Date of event: {singleEvent.date}</h4>
            <h4 class="text"> Location: {singleEvent.location}</h4>
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
