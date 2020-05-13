import React, { Component, useState, useEffect } from "react";

import GoogleMapTile from './GoogleMapTile'

const EventsTile = (props) => {

  const addEventVote = () => {
    useEffect(() =>{
      props.event.votes = props.event.votes + 1
      window.alert("you have voted for !");
    })
  }

  return(
    <div>
      <div>

      <h5 className="text center align-items items-body-content" onClick={() => window.alert(`You voted for ${props.event.name}`)}>{props.event.name}  |  ${props.event.cost } each  |  {props.event.date} </h5>
      <p className="text green"> {props.event.location}</p>
      <GoogleMapTile
      />
      <p className="line"></p>
      </div>

    </div>
  )
}

export default EventsTile;
