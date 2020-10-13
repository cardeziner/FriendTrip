import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const AboutUsPage = props =>{
  return(
    <div className="bg-gray container">
      <h1 className="center title red">About Us</h1>
      <div className="row">
      <div className="bigbox column">
        <h4 className="bodytext">Welcome to FriendTrip! Everyone loves to travel, and the world is too big to not go out and explore.
        Sometimes trips are planned for us, but what about the ones that aren't? What about that one group of friends
        who are bad at coordinating a trip?<br></br><br></br>
        Thats where FriendTrip comes in! Since I have graduated, I have continued working on an app that I have developed, called FriendTrip. FriendTrip is an intuitive app where users can vote on trip events to create a shared itinerary for a vacation group. So far I have incorporated geocoding with a Google Maps API to display the location of group trips, as well as trip events. I plan to develop this further and integrate Air BnB and Venmo APIs. This app has been built using React on Rails to display new information without re-rendering the page to maximize functionality and to minimize calls to API’s. This project is also something I have continued working on since graduation to maintain my skills, and to also use as an opportunity to learn and implement new features into my application.
        </h4>
        </div>
      <div className="column bigbox">
          <h1 className="bodytext center">Write a Review!</h1>
        </div>
        </div>
      </div>
  )
}

export default AboutUsPage
