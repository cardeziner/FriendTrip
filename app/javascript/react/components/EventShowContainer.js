import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import EventsTile from './EventsTile'
import NewEventForm from './NewEventForm'

const EventShowContainer = (props) =>{
    const [trip, setTrip] = useState({})
    const [tripEvents, setTripEvents] = useState([])
    const [users, setUsers] = useState([])
    const [redirect, setRedirect] = useState(false)

    const tripId = props.match.params.id

    useEffect(() =>{
      fetch(`/api/v1/trips/${tripId}`, {
        credentials: "same-origin"
      })
      .then(response =>{
          if(response.ok) {
            return response
          } else {
            let errorMessage = `${response.status} (${response.statusText})`
              error = new Error(errorMessage)
            throw(error)
          }
        })
        .then(response => response.json())
        .then(parsedTrip => {
          setTrip(parsedTrip.trip)
          setTripEvents(parsedTrip.events)
          setUsers(parsedTrip.users)
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`))
      }, [])

      const addNewEvent = (formPayload) => {
    fetch(`/api/v1/trips/${tripId}/events`, {
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
    .then(parsedNewEvent => {
      setTripEvents([
        ...tripEvents,
        parsedNewEvent.event
      ])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const eventsList = tripEvents.map(singleEvent => {
    return (
      <div key={props.match.params.id}>
      <EventsTile
      id={singleEvent.id}
      users={users}
      event={singleEvent}
      tripId={tripId}
      />
      </div>
    )
  })

    return(
      <div className="row"><br/><br/>
      <div className="column">
        <h4 className="text-green text center">VOTE ON ANY EVENT FOR</h4>
        <h1 className="accent-red center">{trip.name}</h1>
        <h5 className="text-blue center">CLICK ON AN EVENT BELOW TO VOTE</h5>
        <p className="line"></p>
        {eventsList}
        </div>
        <div className="column">
        <NewEventForm
        id={tripId}
        addNewEvent={addNewEvent}
        />
        </div>
      </div>
    )

  }

export default EventShowContainer
