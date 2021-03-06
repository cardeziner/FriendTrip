import React, { useState, useEffect } from 'react'

const ReviewListComponent = props =>{
  const [users, setUsers] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() =>{
    fetch(`/api/v1/reviews`, {
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
    .then(parsedReviewsData =>{
      setReviews(parsedReviewsData.reviews)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  // const reviewList = reviews.map(review =>{
  //     return(
  //       <div key={review.id} className="review-box">
  //         <h1 className="between pad">
  //           <h4 className="font left text-yellow">{review.user.first_name} {review.user.last_name[0]}.</h4>
  //           <h4 className="font right">{starify(review.rating)}</h4>
  //         </h1>
  //         <p className=" center vert text-white inline-block table-cell pad">{review.review}</p>
  //         <hr></hr>
  //       </div>
  //     )
  //   })


  return(
    <div>{}</div>
  )
}

export default ReviewListComponent
