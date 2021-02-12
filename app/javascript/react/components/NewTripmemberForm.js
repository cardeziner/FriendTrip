import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const NewTripmemberForm = props =>{
  const [user, setUser] = useState({})
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
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error)
        }
      })
      .then(response => response.json())
      .then(parsedNewUser => {
        let user = parsedNewUser.user
        setUser(user)
        setRedirect(true)
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
      addNewUser({ user: newFormPayload })
      setNewFormPayload({
        email: "",
        first_name: "",
        last_name: "",
      })
      setErrors({})
    }
  }

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
            Friends first name
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
            Friends last name
            <input
              name="last_name"
              id="last_name"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.last_name}
            />
          </label><br/>
          <input className="btn btn-primary text center" type="submit" value="Send Invite" />
        </form><br/>
    </div>
  )
}

export default NewTripmemberForm
