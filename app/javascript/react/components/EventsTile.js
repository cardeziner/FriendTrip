import React, { Component, useState, useEffect } from "react";

import GoogleMapTile from './GoogleMapTile'
import BackdropFilter from "react-backdrop-filter";


const EventsTile = (props) => {
  const addEventVote = () =>{
    window.alert(`You have added a vote for ${props.event.name}`)
    fetch(`/api/v1/trips/${props.tripId}/events/${props.event.id}`, {
      credentials: "same-origin",
      method: 'PATCH',
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
    .then(parsedInfo => {
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return(
    <div>
    <GoogleMapTile
    className="short-map"
    id={props.event.id}
    location={props.event.location}
    />
      <div className="opac-black-tile bot-bord" onClick={addEventVote}>
      <BackdropFilter
      className="bord"
      filter={"blur(20px)"}
      >
      <h2 className="font text-green center" >{props.event.name} </h2>
      <h4 className="text-white center"> ${props.event.cost} per person / {props.event.date}</h4>

      <h2 className="text-white center"> {props.event.location}</h2>
      </BackdropFilter>
      </div>
      <br/>
    </div>
  )
}

export default EventsTile;
