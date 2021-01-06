import React, { Component, useState, useEffect } from "react";

import GoogleMapTile from './GoogleMapTile'
import BackdropFilter from "react-backdrop-filter";
import price from '../../../assets/images/price.png'
import location from '../../../assets/images/location.png'
import date from '../../../assets/images/dates.png'
import place from '../../../assets/images/place.png'

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
    id={props.event.id}
    location={props.event.location}
    />
      <div className="opac-black-tile" onClick={addEventVote}>
      <BackdropFilter
      className="bord"
      filter={"blur(20px)"}
      >
        <div className="row left no-wrap">
          <div className="col-6">
            <h4 className="font resize-font fifty left"><img src={place} className="icon-small"/>{props.event.name} </h4>
          </div>
          <div className="col-6">
            <h4 className="font resize-font fifty"><img src={price} className="icon-small"/> ${props.event.cost}</h4>
          </div>
          <div className="col-6">
            <h4 className="font resize-font fifty"><img src={location} className="icon-small" behavior="scroll"/> {props.event.location}</h4>
          </div>
          <div className="col-6">
            <h4 className="font resize-font fifty"><img src={location} className="icon-small"/>{props.event.date}</h4>
          </div>
          <h1 className="vote-click">VOTE</h1>
          </div>
      </BackdropFilter>
      </div>
      <br/>
    </div>
  )
}

export default EventsTile;
