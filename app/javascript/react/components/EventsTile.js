import React, { Component, useState, useEffect } from "react";

import GoogleMapTile from './GoogleMapTile'

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
    <div key={props.id}>
      <div className="hover-text" onClick={addEventVote}>
      <h2 className="hover-text center" >{props.event.name} </h2>
      <h4 className="hover-text center"> ${props.event.cost} per person     /     {props.event.date}</h4>
    <h2 className="hover-text"> {props.event.location}</h2>
      <GoogleMapTile
      id={props.event.id}
      location={props.event.location}
      />

      </div>
      <br/>
      <p className ="line"></p>
    </div>
  )
}

export default EventsTile;
