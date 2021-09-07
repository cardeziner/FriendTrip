import React, { useState, useEffect } from 'react'

import TripShow from './TripShow'
import GoogleMap from './GoogleMap'

const TripShowContainer = (props) =>{
  const [trip, setTrip] = useState({})
  const [tripEvents, setTripEvents] = useState([])
  const [users, setUsers] = useState([])
  const [tripChats, setTripChats] = useState([])
  const [latitude, setLatitude] = useState({})
  const [longitude, setLongitude] = useState({})

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
        setTripChats(parsedTrip.chats)
        setTrip(parsedTrip.trip)
        setTripEvents(parsedTrip.events)
        setUsers(parsedTrip.users)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }, [])

    if(trip){
    useEffect(() =>{
      fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=oFb44f4KnLyBTFo8vVTt2cshmxLC0W9L&location=${trip.city}`, {
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
        .then(parsedGeoData => {

          setLatitude(parsedGeoData.results[0].locations[0].latLng.lat)
          setLongitude(parsedGeoData.results[0].locations[0].latLng.lng)
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`))
      }, [])
    }

  return(
    <div className="row">
      <h1 className="font center accent-red">{trip.name}</h1>
        <TripShow
        latitude={latitude}
        longitude={longitude}
        id={tripId}
        chats={tripChats}
        trip={trip}
        events={tripEvents}
        users={users}
        />
    </div>
  )
}

export default TripShowContainer
