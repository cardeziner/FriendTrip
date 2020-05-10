import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import NewTripForm from './NewTripForm'

const NewTripContainer = props =>{
  const [redirect, setRedirect] = useState(false)
  const [trip, setTrip] = useState({})

  const addNewTrip = (formPayload) => {
    fetch('/api/v1/trips', {
        credentials: "same-origin",
        method: 'POST',
        body: JSON.stringify(formPayload),
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
      .then(parsedNewTrip => {
        let trip = parsedNewTrip.trip
        setTrip(trip)
        setRedirect(true)
      })
      .catch(error => console.error(`Error in fetch: ${errorMessage}`))
    }

    if (redirect) {
      return <Redirect to={`/trips/${trip.id}`} />
    }

  return(
    <div>
    <h4 className="text">Add a New Trip</h4>
      <NewTripForm
      addNewTrip={addNewTrip}
      />
  </div>
  )
}

export default NewTripContainer
