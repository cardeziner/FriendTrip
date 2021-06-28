import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import userphoto from '../../../assets/images/user_photo.png'

const NewReviewForm = props =>{
  const [review, setReview] = useState({})
  const [errors, setErrors] = useState({})
  const [redirect, setRedirect] = useState(false)
  const [rating, setRating] = useState()
  const [val, setVal] = useState(0)
  const [newFormPayload, setNewFormPayload] = useState({
    rating: 0,
    review: "",
  })

  function getVal(){
   return document.getElementById("rating").value
  }


  if (props.users.length > 0){
  const handleInputChange = event =>{
    setNewFormPayload({
      ...newFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () =>{
    let submitErrors = {}
    const requiredFields = ["review"]
    requiredFields.forEach(field =>{
      if (newFormPayload[field].trim() === "" || newFormPayload === ""){
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
        newFormPayload["rating"] = getVal()
        addNewReview({review: newFormPayload})
        setNewFormPayload({
          rating: 0,
          review: ""
        })
        setErrors({})
        setRedirect(true)
    }
  }

  const setValue = (num) =>{
    setVal(num)
  }

  // if(redirect){
  //   return(
  //     <Redirect to={`/aboutus`}/>
  //   )
  // }

  const users = props.users

  const starify = (count) =>{
    let colorStar = "★"
    let shadeStar = "☆"
    let remainder = (shadeStar.repeat(5-count))
    let result = colorStar.repeat(count) + remainder
    return(result)
  }
  const sortedReviews = props.reviews.sort((a, b) => b.created_at - a.created_at)

  const reviewList = sortedReviews.slice(0, 3).map(review =>{
    let index = (review.user_id - 1)
    return(
      <div key={review.id} className="review-box">
        <h1 className="between pad">
          <h4 className="font left text-yellow">{users[index].first_name} {users[index].last_name[0]}.</h4>
          <h4 className="font right">{starify(review.rating)}</h4>
        </h1>
        <p className=" center vert text-white inline-block table-cell pad">{review.review}</p>
        <hr></hr>
      </div>
    )
  })

  const errorList = Object.keys(errors).map(error =>{
    return(
      error + " is blank!"
    )
  })

  return(
    <div>
      <form onSubmit={handleSubmit} className="center">
      <label className="font">
        <select id="rating" className="center form-field" name="rating" id="rating">
          <option className="center" value="">Select Rating</option>
          <option className="center" value={1}>☆</option>
          <option className="center" value={2}>☆☆</option>
          <option className="center" value={3}>☆☆☆</option>
          <option className="center" value={4}>☆☆☆☆</option>
          <option className="center" value={5}>☆☆☆☆☆</option>
        </select>
        </label><br/>
        <label className="font">
        Enter Review Here
        <div>
        <input
          name="review"
          id="review"
          type="text"
          className="form-field"
          onChange={handleInputChange}
          value={newFormPayload.review}
        />
        </div>
        </label><br/>
        <p className="accent-red center">{errorList}</p>
        <input className="btn btn-primary font" type="submit" value="Submit"/><br/><br/>
      </form>
      <div className="review-box">
      <h1 className="font pad accent-red">Reviews</h1>
      <div className="inline-block">{reviewList}</div>

      <a href="/reviews"><p className="center text-yellow yell-hov">SEE MORE...</p></a>
      </div>
    </div>
  )
}else{
  return(<div>PLEASE WAIT!</div>)
}
}


export default NewReviewForm
