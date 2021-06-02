import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BackdropFilter from "react-backdrop-filter"
import NewReviewForm from './NewReviewForm'

const AboutUsPage = props =>{
  const [reviews, setReviews] = useState([])

  useEffect(() =>{
    fetch(`/api/v1/reviews`, {
      credentials: "same-origin"
    })
    .then(response =>{
        if(response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`
            error = new Error(errorMessage)
          throw(error)
        }
      })
      .then(response => response.json())
      .then(parsedReviews => {
        setReviews(parsedReviews)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }, [])

  const reviewList = () =>{
    reviews.map(review =>{
      let rating = (review.rating * "☆")
      return(
        <div>
        <h1 className="center">{rating}</h1><br/>
        <p>{review.user.first_name}</p>
        <h4>{review.review}</h4>
        </div>
      )
    })
  }

  return(
    <div className="bg-gray">
      <h1 className="center title text-yellow">About Us</h1>
      <div className="row center">
        <div className="col-xs-9 col-md-5">
        <BackdropFilter
        className="bord pad"
        filter={"blur(20px)"}
        >
        <h4 className="text-white">
        <h1 className=" bodytext center text-white">Welcome to FriendTrip!</h1><br/>
        Everyone loves to travel, but the planning process isn't always as enjoyable.
        Sometimes, trips are planned for us, but what about the ones that aren't? What about that one group of friends
        who are bad at coordinating a trip?<br></br><br></br>
        <h1 className="bodytext centertext-white">Thats where FriendTrip comes in!</h1><br/>
         Since I have graduated, I have continued working on a project that I have developed, called FriendTrip. FriendTrip is an intuitive tool where users can vote on trip events to create a shared itinerary for a vacation group.<br/><br/>So far I have incorporated geocoding with a Google Maps API to display the location of group trips, as well as trip events. I plan to develop this further and integrate Air BnB and Venmo APIs. This app has been built using React on Rails to display new information without re-rendering the page to maximize functionality and to minimize calls to API’s. This project is also something I have continued working on since graduation to maintain my skills, and to also use as an opportunity to learn and implement new features into my application.
        </h4>
        </BackdropFilter>
        </div><br/>
        <div className="col-xs-9 col-md-5 pad">
          <BackdropFilter
          className="bord"
          filter={"blur(20px)"}
          >
          <h1 className="bodytext center accent-red">Write a Review!</h1>
          <NewReviewForm
          />
          </BackdropFilter>
        </div>
      </div>
      <br/><br/>
    </div>
  )
}

export default AboutUsPage
