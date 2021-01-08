import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BackdropFilter from "react-backdrop-filter";
import GoogleMapTile from './GoogleMapTile'
import trip_info from '../../../assets/images/trip-info.png'
import location from '../../../assets/images/location.png'
import dates from '../../../assets/images/dates.png'
import friends from '../../../assets/images/friends.png'
import Unsplash from 'unsplash-js'
import schedule from '../../../assets/images/schedule.png'

const TripShow = props =>{
  const [imageUrl, setImageUrl] = useState("")
  const [tripCity, setTripCity] = useState({})

  const iD = (props.id - 1)

  useEffect(() =>{
    fetch(`/api/v1/trips/${props.id}`, {
      credentials: "same-origin",
        })
    .then(response => {
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedTripsData =>{
      setTripCity(parsedTripsData.trip.city)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  // useEffect(() =>{
  //     fetch(`https://api.unsplash.com/search/photos/?client_id=_0SUzohG1CVcvSuRoQCWkvAZr0UAuFoP0UzND3O0i2g&query=${props.trip.city}`, {
  //       credentials: "same-origin",
  //         })
  //     .then(response => {
  //       if(response.ok) {
  //         return response
  //       } else {
  //         let errorMessage = `${response.status} (${response.statusText})`
  //         error = new Error(errorMessage)
  //         throw(error)
  //       }
  //     })
  //     .then(response => response.json())
  //     .then(parsedData =>{
  //       setImageUrl(parsedData.results[Math.floor(Math.random() * parsedData.results.length)].urls.full)
  //     })
  //     .catch(error => console.error(`Error in fetch: ${error.message}`))
  // }, [tripCity])

    if(props.trip.city){
      fetch(`https://api.unsplash.com/search/photos/?client_id=_0SUzohG1CVcvSuRoQCWkvAZr0UAuFoP0UzND3O0i2g&query=${props.trip.city, props.trip.state}`, {
        credentials: "same-origin",
          })
      .then(response => {
        if(response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`
          error = new Error(errorMessage)
          throw(error)
        }
      })
      .then(response => response.json())
      .then(parsedData =>{
        setImageUrl(parsedData.results[Math.floor(Math.random() * parsedData.results.length)].urls.full)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const url = imageUrl

  const eventList = props.events.map(singleEvent =>{
    let count = 0
    if(singleEvent.votes > props.users.length){
      count += 1
      return(
        <div key={singleEvent.id} className="text-yellow click-block" ><br/>
          <h2 className="text">{singleEvent.name}</h2>
          <h5 className="text-white"> {singleEvent.date} </h5>
          <br/>
        </div>
      )}else{
        if (count = 0) {
          return(
            <h4 className="text-white font side-pad"><br/> NO EVENTS HAVE RECEIVED A MAJORITY VOTE.<br/> CLICK BELOW TO VOTE NOW!<br/><br/></h4>
          )
        }
      }
    }
  )


    // <Link to={`/trips/${singleEvent.id}/events`}>{singleEvent.name}</Link><br />

  const length = props.users.length

  const userList = props.users.map(member =>{
    return(
        <h3 key={member.id} className="text green col-2">
        {member.first_name}
        </h3>
      )
    })

  function blankUser(){
    if(userList.length < 1){
      return(
        <h4 className="text-yellow inline absolute vert center">
        <h4 className="side-pad text-yellow">NO FRIENDS HAVE BEEN ADDED TO THIS TRIP YET!</h4>
        </h4>
      )
    } else {
      return(
        <div>
        {userList}
        </div>
      )
    }
  }

  var sectionStyle = {
  backgroundImage: `url(${url})`,
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  height: '100%',
  position: 'absolute',
  backgroundSize: '100% 100%',
  boxShadow: 'inset 0 14px 18px -14px black',
}
  const months = ["January", "February", "March", "April", "May","June", "July", "August", "September", "October", "November","December"]

  function dateByName(date){
    let splitDate = date.split("-");
    let index = splitDate[1] + 1;
    if(date){
      return(
        months[index] + "," + date.split("-")[2] + "" + splitDate[0]
      )
    }else{
      console.log("ERROR")
    }
  }

  return(
    <div className="bg" style={sectionStyle}>
      <div className="dark"></div>
      <h1 className="font center accent-red">{props.trip.name}</h1>
      <div className="row pad">
        <div key={props.trip.id} className="col-xs-12 col-md-5 font">
          <h1 className="text-blue vert left-blue pad left"> TRIP INFO </h1>
          <BackdropFilter
          className="bord"
          filter={"blur(20px)"}
          >
            <GoogleMapTile
            id={props.trip.id}
            location={tripCity}
            trip={props.trip}
            />
            <h2 className="text-white inset">
            <img src={location} className="inline icon"/>
            <div className="vert-line"></div>{(props.trip.city)}, {props.trip.state}<div className="right">
          </div>
          </h2>
          <h3 className="font"><img src={dates} className="icon inline center"/>{props.trip.start_date} - {props.trip.end_date}</h3>
            <br/>
          <div><img src={friends} className="inline icon fifty"/>{blankUser()}</div>
        </BackdropFilter>
      </div>
        <div className="col-5 right grid">
          <h1 className="text-yellow vert right-yellow pad right-head no-bot">TRIP ITINERARY</h1><br/>
            <BackdropFilter
            className="bord"
            filter={"blur(20px)"}
            >
            <div className="opac-black">
              <img src={schedule} className="corners vert"/><h2 className="text-green text inline vert"> Scheduled Events </h2>
              <hr className="gray-line"/>
              </div>
              <div className="text center">
              <div className="">
              {eventList}
              </div><br/>
              <Link to={`/trips/${props.trip.id}/events`} className="text button"><h5 className="text">VOTE ON EVENTS</h5></Link>
            </div>
            </BackdropFilter>
        </div>
      </div>
      <br></br>
      <p className="center"><Link to="/trips" className="font">Back to Trips</Link></p>
    </div>
  )
}

export default TripShow
