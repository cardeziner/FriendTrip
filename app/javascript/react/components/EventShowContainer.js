import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import EventsTile from './EventsTile'
import NewEventForm from './NewEventForm'
import BackdropFilter from "react-backdrop-filter";
import vote_bg from '../../../assets/images/vote-bg.jpg'

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

  var sectionStyle = {
    backgroundImage: `url(${vote_bg})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    height: '100%',
    minHeight: '100%',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    backgroundSize: 'cover',
    boxShadow: 'inset 0 7px 9px -7px black',
  }

    return(
      <div className="bg" style={sectionStyle}>
        <div className="row pad center"><br/><br/>
          <div className="col-5">
            <BackdropFilter
            className="bord vert"
            filter={"blur(20px)"}
            >
            <h5 className="text-white center side-pad">VOTE ON EVENTS FOR</h5>
            <h1 className="font accent-red center large">{trip.name}</h1>
            {eventsList}
            </BackdropFilter>
          </div>
          <div className="col-5 center opac-black-tile">
            <NewEventForm
            id={tripId}
            addNewEvent={addNewEvent}
            />
          </div>
        </div>
      </div>
    )

  }

export default EventShowContainer
