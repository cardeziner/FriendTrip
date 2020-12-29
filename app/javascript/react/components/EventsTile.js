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
    <BackdropFilter
    className="bord opac-black"
    filter={"blur(20px)"}
    >
      <div className="hover-text" onClick={addEventVote}>
      <h2 className="hover-text text-blue center" >{props.event.name} </h2>
      <h4 className="hover-text text-green center"> ${props.event.cost} per person     /     {props.event.date}</h4>
      <GoogleMapTile
      id={props.event.id}
      location={props.event.location}
      />
      <h2 className="hover-text accent-red center"> {props.event.location}</h2>
      </div>
      <br/>
      </BackdropFilter>
    </div>
  )
}

export default EventsTile;
