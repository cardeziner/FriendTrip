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
    <div>
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
      <p className ="line"></p>
    </div>
  )
}

export default EventsTile;
