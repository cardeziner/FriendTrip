import React, { useState, useEffect } from 'react'
import userphoto from '../../../assets/images/user_photo.png'

const NewReviewForm = props =>{


  const [review, setReview] = useState({})
  const [errors, setErrors] = useState({})
  const [redirect, setRedirect] = useState(false)
  const [newFormPayload, setNewFormPayload] = useState({
    rating: 0,
    review: "",
  })


  if (props.users.length > 0){
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

  let value = "0"

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
          newFormPayload["rating"] = value
          addNewReview({review: newFormPayload})
          setNewFormPayload({
            rating: 0,
            review: ""
          })
          setErrors({})
          setRedirect(true)
        }
    }



  const setVal = (val) =>{
    let value = (val)
  }

  if(redirect){
    return(
      <Redirect to={`/trips/${props.tripId}`}/>
    )
  }

  const users = props.users

  const starify = (count) =>{
    let star = "☆"
    let result = star.repeat(count)
    return(result)
  }

  const reviewList = props.reviews.map(review =>{
      let index = (review.user_id - 1)
      return(
        <div key={review.id} className="review-box">
          <img src={userphoto} className="left-pad user-photo"/>
            <h3 className="text-white left vert">{users[index].first_name} {users[index].last_name}<span className="inline vert accent-red right">{starify(review.rating)}</span></h3>
          <h5 className=" center vert text-white inline-block table-cell pad">{review.review}</h5>
</p>

        </div>
      )
    })

    // const avRating =
    //
    // const avRate = props.reviews.map(review =>{
    //   avRating += review.rating
    // })

  return(
    <div>{errors.full_messages}
      <form onSubmit={handleSubmit} className="center">
      <label className="font">
      Select Rating
        <select className="center form-field" name="rating" id="rating">
          <option className="center" value="0">Click Here</option>
          <option className="center" value="1">☆</option>
          <option className="center" value="2">☆☆</option>
          <option className="center" value="3">☆☆☆</option>
          <option className="center" value="4">☆☆☆☆</option>
          <option className="center" value="5">☆☆☆☆☆</option>
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
        {errors.full_messages}

        <input className="btn btn-primary font" type="submit" value="Submit"/><br/><br/>
      </form>
      <div className="review-box">
      <h2 className="font">Reviews</h2>
      <div className="inline-block">{reviewList}</div>
      </div>
    </div>
  )
}else{
  return(<div>please wait</div>)
}
}


export default NewReviewForm
