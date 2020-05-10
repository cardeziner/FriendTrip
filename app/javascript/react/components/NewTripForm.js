import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const NewTripForm = (props) =>{
  const [errors, setErrors] = useState({})
  const [newFormPayload, setNewFormPayload] = useState({
    name: "",
    city: "",
    state: "",
    start_date: "",
    end_date: "",
  })

  const handleInputChange = event =>{
    setNewFormPayload({
      ...newFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () =>{
    let submitErrors = {}
    const requiredFields = ["name", "city", "state", "start_date", "end_date"]
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
      props.addNewTrip({ trip: newFormPayload })
      setNewFormPayload({
        name: "",
        city: "",
        state: "",
        start_date: "",
        end_date: "",
      })
      setErrors({})
    }
  }

  return(
    <div>
        <div>
          <form onSubmit={handleSubmit}>
            <label className="name">
              Name:
              <input
                name="name"
                id="name"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.name}
              />
            </label>
            <label className="city">
              City:
              <input
                name="city"
                id="city"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.city}
              />
            </label>
            <label className="state">
              State:
              <input
                name="state"
                id="state"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.state}
              />
            </label>
            <label className="start_date">
              Start Date (MM/DD/YYYY):
              <input
                name="start_date"
                id="start_date"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.start_date}
              />
            </label>
            <label className="end_date">
              End Date (MM/DD/YYYY):
              <input
                name="end_date"
                id="end_date"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.end_date}
              />
            </label>

          <div className="button-group">
            <input className="button" type="submit" value="Add New Trip" />
          </div>
          </form>
        </div>
        <div className="bottom-bar">
        <Link to="/trips">Back to Home</Link>
        </div>
      </div>

  )
}

export default NewTripForm
