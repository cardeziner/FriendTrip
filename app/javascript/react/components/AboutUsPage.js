import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BackdropFilter from "react-backdrop-filter"

const AboutUsPage = props =>{
  return(
    <div className="bg-gray">
      <h1 className="center title red">About Us</h1>
      <div className="row center">
      <div className="col-6">
      <BackdropFilter
      className="bord"
      filter={"blur(20px)"}
      >
        <h4 className="text-white">
        <h1 className=" bodytext center">Welcome to FriendTrip!</h1><br/>
        Everyone loves to travel, but the planning process isn't always as enjoyable.
        Sometimes, trips are planned for us, but what about the ones that aren't? What about that one group of friends
        who are bad at coordinating a trip?<br></br><br></br>
        <h1 className="bodytext center">Thats where FriendTrip comes in!</h1><br/>
         Since I have graduated, I have continued working on an project that I have developed, called FriendTrip. FriendTrip is an intuitive tool where users can vote on trip events to create a shared itinerary for a vacation group.<br/><br/>So far I have incorporated geocoding with a Google Maps API to display the location of group trips, as well as trip events. I plan to develop this further and integrate Air BnB and Venmo APIs. This app has been built using React on Rails to display new information without re-rendering the page to maximize functionality and to minimize calls to API’s. This project is also something I have continued working on since graduation to maintain my skills, and to also use as an opportunity to learn and implement new features into my application.
        </h4>
        </BackdropFilter>
        </div>

      <div className="col-6">
        <BackdropFilter
        className="bord"
        filter={"blur(20px)"}
        >
        <h1 className="bodytext center">Write a Review!</h1><br/>
        <h1 className="center bodytext text-yellow">COMING SOON...</h1>
        </BackdropFilter>
      </div>
    </div>
    <br/><br/>
  </div>
  )
}

export default AboutUsPage
