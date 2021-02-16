import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import EventsTile from './EventsTile'
import NewEventForm from './NewEventForm'
import BackdropFilter from "react-backdrop-filter";
import vote_bg from '../../../assets/images/vote-bg.jpg'
import voting from '../../../assets/images/voting.png'

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
        <div key={props.match.params.id} className="all-sides">
        <EventsTile
        id={singleEvent.id}
        users={users}
        event={singleEvent}
        tripId={tripId}
        />
        </div>
      )
    }
  )

    var sectionStyle = {
      backgroundImage: `url(${vote_bg})`,
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      height: '100%',
      minHeight: '100%',
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      objectFit: 'cover',
      boxShadow: 'inset 0 7px 9px -7px black',
    }

  return(
    <div className="bg" style={sectionStyle}>
      <h1 className="accent-red center">EVENTS & VOTES</h1>
      <div className="row pad center"><br/><br/>
        <div className="col-5">
        <BackdropFilter
        className="bord vert pad"
        filter={"blur(20px)"}
        >

          <div className="inline-block left vert">
            <h4 className="text-white font center">VOTE ON EVENTS FOR</h4>
            <h1 className="font text-yellow center large ">{trip.name}</h1><br/>
          </div>
        <BackdropFilter
        className="bord vert"
        filter={"blur(20px)"}
        >
        {eventsList}
        </BackdropFilter>
        </BackdropFilter>
        </div>
        <div className="col-5 center opac-black-tile pad vert fixed">
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
