import React, { useState, useEffect } from 'react'

const NewReviewForm = props =>{
  const [review, setReview] = useState({})
  const [newFormPayload, setNewFormPayload] = useState({
    rating: 0,
    review: "",
  })

  const addNewReview = (formPayload) => {
    fetch('/api/v1/reviews', {
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
      .then(parsedNewReview => {
        setReview(parsedNewReview)
      })
      .catch(error => console.error(`Error in fetch: ${errorMessage}`))
    }



  return(
    <div>hello world</div>
  )
}

export default NewReviewForm
