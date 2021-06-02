import React, { useState, useEffect } from 'react'

const NewReviewForm = props =>{
  const [review, setReview] = useState({})
  const [errors, setErrors] = useState({})
  const [newFormPayload, setNewFormPayload] = useState({
    rating: 0,
    review: "",
  })

  const handleInputChange = event =>{
    setNewFormPayload({
      ...newFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () =>{
    let submitErrors = {}
    const requiredFields = ["rating", "review"]
    requiredFields.forEach(field =>{
      if (newFormPayload[field].trim() === ""){
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

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

    const handleSubmit = event =>{
      event.preventDefault()
        if (validForSubmission()) {
          addNewReview({review: newFormPayload})
          setNewFormPayload({
            rating: 0,
            review: ""
          })
          setErrors({})
        }
    }

  return(
    <div>{errors.full_messages}
      <form onSubmit={handleSubmit}>
        <select className="center" name="rating" id="rating">
          <option value="1">☆</option>
          <option value="1">☆☆</option>
          <option value="1">☆☆☆</option>
          <option value="1">☆☆☆☆</option>
          <option value="1">☆☆☆☆☆</option>
        </select>
        <label>
        Please write your review below
        <textarea className="wide-text">
        <input
          name="review"
          id="review"
          type="text"
          onChange={handleInputChange}
          value={newFormPayload.review}
        />
        </textarea>
        </label><br/>
        <input className="btn btn-primary" type="submit" value="Submit"/><br/><br/>
      </form>
    </div>
  )
}

export default NewReviewForm
