import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BackdropFilter from "react-backdrop-filter";
import GoogleMapTile from './GoogleMapTile'
import NewFlightForm from './NewFlightForm'
import NewTripmemberForm from './NewTripmemberForm'
import FlightTile from './FlightTile'
import GooglePlaceComponent from './GooglePlaceComponent'
import Unsplash from 'unsplash-js'
import NewHotelForm from './NewHotelForm'
import trip_info from '../../../assets/images/trip-info.png'
import location from '../../../assets/images/location.png'
import dates from '../../../assets/images/dates.png'
import pin from '../../../assets/images/pin.png'
import friends from '../../../assets/images/friends.png'
import schedule from '../../../assets/images/schedule.png'
import cashbag from '../../../assets/images/cashbag.png'
import cost from '../../../assets/images/cost.png'
import flight_logo from '../../../assets/images/Flight-logo.png'
import flight_to from '../../../assets/images/flight_to.png'
import hotel from '../../../assets/images/hotel.png'
import ChatRoomComponent from './ChatRoomComponent'
import WeatherComponent from './WeatherComponent'

require('dotenv').config()

const TripShow = props =>{
  const [imageUrl, setImageUrl] = useState("")
  const [tripCity, setTripCity] = useState({})
  const [click, setClick] = useState(true)
  const [toggle1, setToggle1] = useState("hide")
  const [toggle2, setToggle2] = useState("hide")
  const [toggle3, setToggle3] = useState("hide")
  const [toggle4, setToggle4] = useState("hide")
  const [toggle5, setToggle5] = useState("hide")
  const [toggle6, setToggle6] = useState("hide")
  const [toggle7, setToggle7] = useState("hide")
  const [flightData, setFlightData] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [currentUserFlights, setCurrentUserFlights] = useState([])
  const [hotels, setHotels] = useState([])
  const [tripHotels, setTripHotels] = useState([])
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [userTripHotels, setUserTripHotels] = useState([])
  const [tripChats, setTripChats] = useState([])
  const [tripStart, setTripStart] = useState("")


  if(props.trip){

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
      setTripChats(parsedTripsData.chats)
      setUserTripHotels(parsedTripsData.user_trip_hotels)
      setFlightData(parsedTripsData.flights)
      setTripCity(parsedTripsData.trip.city)
      setCurrentUserFlights(parsedTripsData.user_flights)
      setCurrentUser(parsedTripsData.user)
      setTripHotels(parsedTripsData.hotels)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

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

  const addNewFlight = (formPayload) => {
    fetch('/api/v1/flights', {
        credentials: "same-origin",
        method: 'POST',
        body: JSON.stringify(formPayload),
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
      .then(parsedNewFlight => {
        setFlight(parsedNewFlight)
        setRedirect(true)
      })
      .catch(error => console.error(`Error in fetch: ${errorMessage}`))
    }

  const addNewHotel = (formPayload) => {
    fetch('/api/v1/hotels', {
        credentials: "same-origin",
        method: 'POST',
        body: JSON.stringify(formPayload),
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
      .then(parsedNewHotel => {
        setHotels(parsedNewHotel)
        setRedirect(true)
      })
      .catch(error => console.error(`Error in fetch: ${errorMessage}`))
    }

  const url = imageUrl

  const dateByName = (date) =>{
    let months = ["January", "February", "March", "April", "May","June", "July", "August", "September", "October", "November","December"]
    let splitDate = date.split("-");
    let index = parseInt(splitDate[1]) + 1;
    if(date){
      return(
        months[index] + " " + splitDate[2] + ", " + splitDate[0]
        )
      }else{
        console.log("ERROR")
      }
    }

  const formatAMPM = (unparsedDate) =>{
    const parseddate = new Date(unparsedDate)
    var hours = parseddate.getHours();
    var minutes = parseddate.getMinutes();
    if(hours >= 12){
      if(hours === 0){
      return(`12:${minutes} PM`)
    }else{
      return(`${hours}:${minutes} PM`)
    }
    }
    if(hours < 12){
      if(hours === 0){
        return(`12:${minutes} AM`)
      }else{
        return(`${hours}:${minutes} AM`)
      }
    }
  }

  function date(date) {
    if (date) {
      return(dateByName(date))
    }
  }

  const count = 0

  const eventArray = []

  const eventList = props.events.map(singleEvent =>{
    if(singleEvent.votes > (props.users.length / 2)){
      eventArray.push(singleEvent.cost)
      return(
        <div key={singleEvent.id}>
          <div className="showhim click-block white-yell bot-pad vert" ><br/>
            <h2 className="just-font">{singleEvent.name}</h2>
            <h5 className="text-white">{dateByName(singleEvent.date)} </h5>
              <div className="showme">
                <div className="row inline-block">
                  <div className="col-6 inline-block text-white left">
                    <p className="text-sm center vert"><img src={pin} className="icon-small"/>{singleEvent.location}</p>
                  </div>
                  <div className="col-6 inline-block text-white right">
                    <p className="text-sm inline right vert">${singleEvent.cost} Per Person</p><img src={cashbag} className="inline icon-small right"/>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        )
      }
    }
  )

  const noEvents = () =>{
    if ((eventList.length === 0) || props.events.length < 1 ){
      return(
        <h5 className="text-white font side-pad"><br/> NO EVENTS HAVE BEEN MADE YET!<br/> CLICK BELOW TO ADD ONE!<br/><br/></h5>
      )
    }
  }

  const userList = props.users.map(member =>{
    return(
        <h3 key={member.id} className="inline vert font text-yellow ">
        {member.first_name}<br/>
        </h3>
      )
    }
  )

  function blankUser(){
    if(userList.length < 1){
      return(
        <h4 className="text-yellow inline absolute vert resize-text center side-pad">
        NO FRIENDS HAVE BEEN ADDED TO THIS TRIP YET!
        </h4>
      )
    } else {
      return(
        <div className="block vert left inline-block">
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


  function change1(){
    const v = document.getElementById("form-info")
    if (toggle1 === "hide"){
      setToggle1("display")
   }else{
     setToggle1("hide")
    }
  }

  function change2(){
    const v = document.getElementById("form-info")
    if (toggle2 === "hide"){
      setToggle2("display")
   }else{
     setToggle2("hide")
    }
  }

  function change3(){
    const v = document.getElementById("flight-list")
    if (toggle3 === "hide"){
      setToggle3("display")
   }else{
     setToggle3("hide")
    }
  }

  function change4(){
    const v = document.getElementById("flight-list")
    if (toggle4 === "hide"){
      setToggle4("display")
   }else{
     setToggle4("hide")
    }
  }

  function change5(){
    const v = document.getElementById("hotel-list")
    if (toggle5 === "hide"){
      setToggle5("display")
   }else{
     setToggle5("hide")
    }
  }

  function change6(){
    const v = document.getElementById("hotel-bookings")
    if (toggle6 === "hide"){
      setToggle6("display")
   }else{
     setToggle6("hide")
    }
  }

  function change7(){
    const v = document.getElementById("user-hotels")
    if (toggle7 === "hide"){
      setToggle7("display")
   }else{
     setToggle7("hide")
    }
  }


  function arrow(){
    if (toggle3 === "hide"){
      return(<h1 className="inline"> +</h1>)
    }else{
      return(<h1 className="inline"> -</h1>)
    }
  }

  function arrow1(){
    if (toggle4 === "hide"){
      return(<h1 className="inline"> +</h1>)
    }else{
      return(<h1 className="inline"> -</h1>)
    }
  }

  function arrow2(){
    if (toggle6 === "hide"){
      return(<h1 className="inline"> +</h1>)
    }else{
      return(<h1 className="inline"> -</h1>)
    }
  }

  function arrow3(){
    if (toggle7 === "hide"){
      return(<h1 className="inline"> +</h1>)
    }else{
      return(<h1 className="inline"> -</h1>)
    }
  }

  let tally = 0

  const amountOwed = eventArray.map(cost =>{
      tally += cost
    }
  )

  const sortedUserFlightList = _.sortBy(currentUserFlights, 'departure_date')

  const userFlightList = sortedUserFlightList.map(flight =>{
    let flightNum = sortedUserFlightList.indexOf(flight) + 1
      return(
        <div key={flight.id} className="showhim no-top">
          <h3 className="text-blue"> {flight.departing_airport} to {flight.arriving_airport}</h3>
          <div className="showme blue-hover no-top no-bot center">
              <h2 className="center text-white vert inline">{flight.departing_airport} <img src={flight_to} className="fl-logo inline"/> {flight.arriving_airport}<br/></h2>
              <h4 className="center text-white vert">{flight.airline}</h4>
              <p className="center text-white table-cell resize-text">DEPARTS   {dateByName(flight.departure_date)} @ {formatAMPM(flight.departure_time)}<br/></p>
              <p className="center text-white table-cell ">ARRIVES   {dateByName(flight.arrival_date)} @ {formatAMPM(flight.arrival_time)}<br/></p>
          </div>
        </div>
      )
  })


  const sortedTripFlightList = _.sortBy(flightData, 'user_name')

  const tripUserFlightList = sortedTripFlightList.map(flight =>{
    return(
      <div key={flight.id} className="showhim row flex inline">
        <h3 className="col-3 text-blue align-self-center inline center">{flight.user_name}</h3>
        <div className="col-9 showme blue-hover no-top no-bot">
            <h2 className="center text-white vert inline">{flight.departing_airport} <img src={flight_to} className="fl-logo inline"/> {flight.arriving_airport}<br/></h2>
            <h4 className="center text-white vert">{flight.airline}</h4>
            <p className="center text-white table-cell resize-text">DEPARTS {dateByName(flight.departure_date)} @ {formatAMPM(flight.departure_time)}<br/></p>
            <p className="center text-white table-cell ">ARRIVES   {dateByName(flight.arrival_date)} @ {formatAMPM(flight.arrival_time)}<br/></p>
        </div>
      </div>
    )
  })

  const sortedUserHotelsList = _.sortBy(flightData, 'user_name')

  const tripHotelsList = tripHotels.map(hotel =>{
    let timestampIn = hotel.check_in
    let checkIn = new Date(timestampIn)
    checkIn = checkIn.toString().split(" ")
    const fullCheckIn = checkIn[0] + ", " + checkIn[1] + " " + checkIn[2] + " " + checkIn[3]
    let timestampOut = hotel.check_out
    let checkOut = new Date(timestampOut)
    checkOut = checkOut.toString().split(" ")
    const fullCheckOut = (checkOut[0] + ", " + checkOut[1] + " " + checkOut[2] + " " +  checkOut[3])
    return(
      <div key={hotel.id} className="showhim row flex inline">
        <h3 className="col-3 text-purp align-self-center inline center">{hotel.user_name.split(" ")[0]}</h3>
        <div className="col-9 showme purp-hover no-top no-bot">
            <h3 className=" center text-white">{hotel.name}</h3>
            <h4 className="center text-white vert inline">{hotel.address}, {hotel.city} {hotel.state} </h4>
            <h4 className="center text-white vert"></h4>
            <p className="center text-white table-cell resize-text">Check In {fullCheckIn}<br/></p>
            <p className="center text-white table-cell ">Check Out {fullCheckOut}<br/></p>
        </div>
      </div>
    )
  })

  const userHotelList = userTripHotels.map(hotel =>{
    let timestampIn = hotel.check_in
    let checkIn = new Date(timestampIn)
    checkIn = checkIn.toString().split(" ")
    const fullCheckIn = checkIn[0] + ", " + checkIn[1] + " " + checkIn[2] + " " + checkIn[3]
    let timestampOut = hotel.check_out
    let checkOut = new Date(timestampOut)
    checkOut = checkOut.toString().split(" ")
    const fullCheckOut = (checkOut[0] + ", " + checkOut[1] + " " + checkOut[2] + " " +  checkOut[3])
    return(
      <div key={hotel.id} className="showhim row flex inline">
        <h3 className=" text-purp align-self-center inline center">{fullCheckIn}</h3>
        <div className="col-9 showme purp-hover no-top no-bot">
            <h3 className=" center text-white">{hotel.name}</h3>
            <h4 className="center text-white vert inline">{hotel.address}, {hotel.city} {hotel.state} </h4>
            <h4 className="center text-white vert"></h4>
            <p className="center text-white table-cell resize-text">Check In {fullCheckIn}</p>
            <p className="center text-white table-cell ">Check Out {fullCheckOut}<br/></p>
        </div>
      </div>
    )
  })

  const tripsNotice = () =>{
    if (tripUserFlightList.length < 1){
      return(
        <h5 className="text-white center">NO FLIGHTS HAVE BEEN ADDED YET!<br/> CLICK BELOW TO ADD ONE.</h5>
      )
    }else{
      return(
        <h5 className="text-white center">TRIPMEMBERS HAVE ADDED (<h5 className="text-yellow inline">{flightData.length}</h5>) FLIGHTS</h5>
      )
    }
  }

  const hotelNotice = () =>{
    if (tripUserFlightList.length < 1){
      return(
        <h5 className="text-white center">NO FLIGHTS HAVE BEEN ADDED YET!<br/> CLICK BELOW TO ADD ONE.</h5>
      )
    }else{
      return(
        <h5 className="text-white center">TRIPMEMBERS HAVE ADDED (<h5 className="text-yellow inline">{flightData.length}</h5>) FLIGHTS</h5>
      )
    }
  }

  const userTripsNotice = () =>{
    if (userFlightList.length < 1){
      return(
        <h5 className="text-white center">YOU HAVE NOT ADDED ANY FLIGHTS YET.<br/> CLICK "+ADD A FLIGHT" BELOW GROUP FLIGHTS SECTION TO BEGIN.</h5>
      )
    }else{
      return(
        <h5 className="text-white center">YOU CURRENTLY HAVE (<h5 className="text-yellow inline">{userFlightList.length}</h5>) FLIGHTS SCHEDULED</h5>
      )
    }
  }

  const tripHotelsNotice = () =>{
    if (tripHotels.length < 1){
      return(
        <h5 className="text-white center">YOU HAVE NOT ADDED ANY HOTELS YET. CLICK "+ADD A HOTEL" BELOW TO BEGIN.</h5>
      )
    }else{
      return(
        <h5 className="text-white center">THIS GROUP CURRENTLY HAS (<h5 className="text-yellow inline">{tripHotels.length}</h5>) HOTELS BOOKED</h5>
      )
    }
  }

  const userHotelsNotice = () =>{
    if (userHotelList.length < 1){
      return(
        <h5 className="text-white center vert">YOU HAVE NOT ADDED ANY HOTELS YET. CLICK "+ADD A HOTEL" TO BEGIN.</h5>
      )
    }else{
      return(
        <h5 className="text-white center vert">YOU CURRENTLY HAVE (<h5 className="text-yellow inline">{userHotelList.length}</h5>) HOTELS BOOKED</h5>
      )
    }
  }


  return(
    <div className="bg" style={sectionStyle}>
      <h1 className="font center accent-red head-shade">{props.trip.name}</h1>
      <div className="row pad">
        <div key={props.trip.id} className="col-xs-9 col-md-5 font">
          <h1 className="text-white vert left-red pad left"><p className="">Your Trip Info</p></h1>
          <BackdropFilter
          className="bord vert"
          filter={"blur(20px)"}
          >
            <GoogleMapTile
            id={props.trip.id}
            location={tripCity}
            trip={props.trip}
            />
            <h3 className="text-white inset vert">
            <img src={location} className="inline icon"/>
            <div className="vert-line vert"></div><h5 className=" inline text-white resize-font">{(props.trip.city)}, {props.trip.state}</h5><div className="right">
          </div>
          </h3>
          <h3 className="text-white vert"><img src={dates} className="icon inline center"/><h5 className="center font inline">{props.trip.start_date} - {props.trip.end_date}</h5></h3>
            <h3 className="text-white vert"><img src={cost} className="icon inline center"/><h5 className="center  font inline">Your Costs: ${tally} </h5></h3>
            <h3 onClick={change3} className="vert inline"><img src={flight_logo} className="inline icon center"/><h3 className="vert blue-click inline">Your Flights{arrow()}</h3></h3>
            {userTripsNotice()}
            <div className="center"><h5 id="flight-list" className={toggle3}><br/>{userFlightList}</h5></div>
            <h5 className="text-white vert"><img src={hotel} className="icon inline center"/><h3 onClick={change7} className="center font inline click-purp">Your Hotels {arrow3()}</h3></h5>
            {userHotelsNotice()}
            <div className="center"><h5 id="user-hotels" className={toggle7}>{userHotelList}</h5></div><br/>
            <div className="flex vert"><img src={friends} className="inline icon fifty"/><div className="inline">{blankUser()}</div></div>
              <div>
              <h5 className="font center accent-white" onClick={change1}> + INVITE A FRIEND</h5>
                <div id="form-info" className={toggle1}>
                  <NewTripmemberForm
                   trip_id={props.trip.id}
                  />
                </div>
              </div>
            </BackdropFilter><br/>
            <h1 className="text-white vert left-green pad left"><p>Group Chat</p></h1>
            <div className="bord">
            <p clkasName="small-font center">SCROLL TO BOTTOM TO SEE MOST RECENT CHATS</p>
            <ChatRoomComponent
              currentUser={currentUser}
              tripChats={tripChats}
              userTripHotels={userTripHotels}
              tripId={props.trip.id}
            />
            </div>
          </div>
            <div className="col-xs-12 col-md-5 grid tall">
              <h1 className="text-white vert right-yellow pad right-head"><p className="">Group Itinerary</p></h1>
                <BackdropFilter
                className="bord"
                filter={"blur(20px)"}
                >
                <div className="no-top">
                  <img src={schedule} className="icon inline vert"/><h2 className="text-yellow text inline vert resize-font1"> Scheduled Events </h2>
                  </div>
                  <div className="text center vert">
                      {eventList}{noEvents()}
                      <Link to={`/trips/${props.trip.id}/events`} className="text button"><h5 className="text">VOTE ON EVENTS</h5></Link>
                  </div>
                </BackdropFilter>
                <h1 className="text-white vert right-blue pad right-head inline"><p>Flights</p></h1>
                <div className=" col-xs-12 col-md-12 ">
                  <BackdropFilter
                  className="bord"
                  filter={"blur(20px)"}
                  >
                  <img src={flight_logo} className="icon inline vert"/><h2 onClick={change4} className="inline text-blue vert center heading">Group Flights{arrow1()}</h2>
                  {tripsNotice()}<br/>
                  <div id="flight-list" className={toggle4}>
                  {tripUserFlightList}<br/>
                  </div>
                  <div>
                  <h5 className="font center white-blue" onClick={change2}>+ ADD A FLIGHT</h5>
                  <br/>
                    <div id="form-info" className={toggle2}>
                    <NewFlightForm
                    currentUser={currentUser}
                    tripId={props.id}
                    addNewFlight={addNewFlight}
                    />
                    </div>
                  </div>
                  </BackdropFilter>
                </div>
                <h1 className="text-white vert right-purp pad right-head inline"><p>Hotels</p></h1>
                <div className=" col-xs-12 col-md-12 ">
                  <BackdropFilter
                  className="bord"
                  filter={"blur(20px)"}
                  >
                  <img src={hotel} className="icon inline vert"/><h2 onClick={change6} className="inline text-purp vert center">Hotel Bookings{arrow2()}</h2>
                    {tripHotelsNotice()}
                  <div id="hotel-bookings" className={toggle6}><br/>
                    {tripHotelsList}
                  </div><br/>
                  <h5 className="font center click-purp" onClick={change5}>+ ADD A HOTEL</h5><br/>
                  <div id="hotel-list" className={toggle5}>
                    <NewHotelForm
                    hotels={tripHotels}
                    addNewHotel={addNewHotel}
                    tripId={props.id}
                    />
                  </div>
                  </BackdropFilter><br/>
                  <BackdropFilter
                  className="bord"
                  filter={"blur(20px)"}
                  >
                  <WeatherComponent
                  location={props.trip.city}
                  />
                  </BackdropFilter>
                </div>
              </div>
            </div>
          <br></br>
          <p className="center"><Link to="/trips" className="font">Back to Trips</Link></p>
        </div>
      )
    }else{
      return(
        <div> please wait!</div>
      )
    }
    }

export default TripShow
