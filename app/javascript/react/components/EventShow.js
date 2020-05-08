import React from 'react'

const EventShow = (props) =>{

  const eventList = props.events.map(singleEvent =>{
    return(
      <div class="column text">
        <h1 class="font">{singleEvent.name}</h1>
          <div class="frame">
            <h3 class="text"> Date of event: {singleEvent.date}</h3>
            <h3 class="text"> Location: {singleEvent.location}</h3>
        </div>
      </div>
    )
  })

  return(
    <div>
      {eventList}
    </div>
  )
}

export default EventShow
