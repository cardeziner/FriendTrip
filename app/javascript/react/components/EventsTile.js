import React, { Component } from "react";

const EventsTile = (props) => {

  //  const handleVote = () => {
  //   props.event.votes++
  //   window.alert("Vote Received")
  // }

  return(
    <div>
      <div>
      <h1 className="text-yellow items-body-content" onClick={() => {
       props.event.votes = props.event.votes + 1
       window.alert(`We have added a vote for ${props.event.name} :-D`)
     }}>{props.event.name}  |  ${props.event.cost } each  |  {props.event.date}</h1>
      </div>
    </div>
  )
}
export default EventsTile;
