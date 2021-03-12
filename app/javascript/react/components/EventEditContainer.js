import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const EventEditContainer = props =>{
 const [redirect, setRedirect] = useState(false)
 const [eventEditField, setEventEditField] = useState({})

 const tripId = props.match.params.id

 const editRestaurant = (editFormPayload) =>{
    fetch(`/api/v1/trips/${tripId}`, {
      credentials: "same-origin",
      method: 'PATCH',
      body: JSON.stringify(editFormPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedTrip => {
      debugger
      setRedirect(true)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  if (redirect) {
    return <Redirect to={`/trips/${tripId}/events`} />
  }


  return(
    <div>
    hello world
    
    </div>
  )
}

export default EventEditContainer
