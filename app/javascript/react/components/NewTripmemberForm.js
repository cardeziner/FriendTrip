import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup';
import _ from 'lodash'

const NewTripmemberForm = props =>{
  const [user, setUser] = useState({})
  const [popUp, setPopUp] = useState(false)
  const [errors, setErrors] = useState({})
  const [newFormPayload, setNewFormPayload] = useState({
    email: "",
    first_name: "",
    last_name: "",
  })

  const addNewUser = (formPayload) => {
    fetch('/api/v1/invites', {
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
          if(response.status === "422"){
            return response
          }
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error)
        }
      })
      .then(response => response.json())
      .then(parsedResponse => {
        if(!parsedResponse.error){
          let user = parsedResponse.user
          setUser(user)
          setPopUp("Invite Sent!")
        }
      })
      .catch(error => console.error(`Error in fetch: ${errorMessage}`))
    }

  const handleInputChange = event =>{
    setNewFormPayload({
      ...newFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () =>{
    let submitErrors = {}
    const requiredFields = ["email", "first_name", "last_name"]
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

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      addNewUser({ user: newFormPayload, trip_id: props.trip_id })
      setNewFormPayload({
        email: "",
        first_name: "",
        last_name: "",
      })
      setErrors({})
    }
  }

  if (popUp){
    alert(popUp)
    setPopUp(false)
    location.reload();
    location.reload();
    return false;
  }

  const errorList = Object.keys(errors).map(error =>{
    let str = error + " is blank!"
    let cleanedError = str.replace("_", " ")
    return(
      <p className="accent-red">{cleanedError.toUpperCase()}<br/></p>
    )
  })

  return(
    <div>
      <h1 className="center font accent-red">
        ENTER FRIENDS INFO
        </h1>
        <form onSubmit={handleSubmit} className="wide-field center">
          <label className="email text-white">
            Friends Email
            <input
              name="email"
              id="email"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.email}
            />
          </label>
          <br/>
          <label className="first_name text-white">
            Friends First Name
            <input
              name="first_name"
              id="first_name"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.first_name}
            />
          </label>
          <br/>
          <label className="last_name text-white">
            Friends Last Name
            <input
              name="last_name"
              id="last_name"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.last_name}
            />
          </label><br/>
          {errorList}
          <input className="btn btn-primary text center" type="submit" value="Send Invite"  />
        </form><br/>
    </div>
  )
}

export default NewTripmemberForm
