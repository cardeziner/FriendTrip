import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BackdropFilter from "react-backdrop-filter";
import GoogleMapTile from './GoogleMapTile'
import NewTripmemberForm from './NewTripmemberForm'
import trip_info from '../../../assets/images/trip-info.png'
import location from '../../../assets/images/location.png'
import dates from '../../../assets/images/dates.png'
import friends from '../../../assets/images/friends.png'
import Unsplash from 'unsplash-js'
import schedule from '../../../assets/images/schedule.png'

const TripShow = props =>{
  const [imageUrl, setImageUrl] = useState("")
  const [tripCity, setTripCity] = useState({})
  const [click, setClick] = useState(true)
  const [toggle, setToggle] = useState("hide")

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


    if(props.trip.city && click){
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
        setClick(false)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`)),[]
  }

  const url = imageUrl

  const eventList = props.events.map(singleEvent =>{
    let count = 0
    if(singleEvent.votes > props.users.length){
      count += 1
      return(
        <div key={singleEvent.id}>
          <div className="showhim text-yellow click-block bot-pad vert" ><br/>
            <h2 className="text">{singleEvent.name}</h2>
            <h5 className="text-white"> {singleEvent.date} </h5>
              <div className="showme">
                <h5 className="inline-block text-white">
                {singleEvent.location}
                </h5>
              </div>
          </div>
        </div>
      )}
    }
  )

  function noEvents(){
    if (props.events.length < 1){
      return(
        <h4 className="text-white font side-pad"><br/> NO EVENTS HAVE RECEIVED A MAJORITY VOTE.<br/> CLICK BELOW TO VOTE NOW!<br/><br/></h4>
      )
    }
  }

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
        <h4 className="text-yellow inline absolute vert center side-pad">
        NO FRIENDS HAVE BEEN ADDED TO THIS TRIP YET!
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
  objectFit: 'cover',
  boxShadow: 'inset 0 14px 18px -14px black',
}

  function dateByName(date){
      let months = ["January", "February", "March", "April", "May","June", "July", "August", "September", "October", "November","December"]
      let splitDate = date.split("-");
      let index = splitDate[1].to_i + 1;
      if(date){
        return(
          months[index] + "," + date.split("-")[2] + "" + splitDate[0]
        )
      }else{
        console.log("ERROR")
      }
  }

  // function showDiv() {
  //     document.getElementById("myDiv").style.display = "";
  // }

  // function toggle() {
  //       let v = document.getElementById("toggle");
  //       if (v.style.display === "none") {
  //          v.style.display = "block";
  //       } else {
  //          v.style.display = "none";
  //       }
  //    }


  function change(){
    const v = document.getElementById("form-info")
    if (toggle === "hide"){
     setToggle("display")
  }else{
    setToggle("hide")
  }
}


  return(
    <div className="bg" style={sectionStyle}>
      <div className="dark"></div>
      <h1 className="font center accent-red">{props.trip.name}</h1>
      <div className="row pad">
        <div key={props.trip.id} className="col-xs-12 col-md-5 font grid">
          <h1 className="text-white vert left-blue pad left"> TRIP INFO </h1>
          <BackdropFilter
          className="bord"
          filter={"blur(20px)"}
          >
            <GoogleMapTile
            id={props.trip.id}
            location={tripCity}
            trip={props.trip}
            />
            <h2 className="text-blue inset">
            <img src={location} className="inline icon"/>
            <div className="vert-line"></div>{(props.trip.city)}, {props.trip.state}<div className="right">
          </div>
          </h2>
          <h3 className="text-blue"><img src={dates} className="icon inline center"/>{props.trip.start_date} - {props.trip.end_date}</h3>
            <br/>
          <div><img src={friends} className="inline icon fifty"/>{blankUser()}</div>
          <div>
          <h5 className="" onClick={change}> INVITE A FRIEND</h5>
          <h5 id="form-info" className={toggle}>here is form info</h5>
          </div>
        </BackdropFilter>
      </div>
        <div className="col-5 grid tall">
          <h1 className="text-white vert right-yellow pad right-head">TRIP ITINERARY</h1><br/>
            <BackdropFilter
            className="bord"
            filter={"blur(20px)"}
            >
            <div className="opac-black">
              <img src={schedule} className="corners vert"/><h2 className="text-green text inline vert"> Scheduled Events </h2>
              <hr className="gray-line"/>
              </div>
              <div className="text center">
                  {eventList}{noEvents()}
                  <Link to={`/trips/${props.trip.id}/events`} className="text button"><h5 className="text">VOTE ON EVENTS</h5></Link>
              </div>
            </BackdropFilter>
        </div>

        <NewTripmemberForm
        trip_id={props.trip.id}
        />
      </div>
      <br></br>
      <p className="center"><Link to="/trips" className="font">Back to Trips</Link></p>
    </div>
  )
}

export default TripShow
