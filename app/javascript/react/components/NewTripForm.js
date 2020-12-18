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
    <div className="new-trip-bg"><br/>
      <h1 className="text-white center">Add a New Trip</h1><br/>
        <div className="center opac-black col-6 mid-float">
          <form onSubmit={handleSubmit} className="wide-field">
            <label className="name text-white">
              TRIP NAME
              <input
                name="name"
                id="name"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.name}
              />
            </label>
            <br/>
            <label className="city text-white">
              CITY
              <input
                name="city"
                id="city"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.city}
              />
            </label>
            <br/>
            <label className="state text-white">
              STATE
              <input
                name="state"
                id="state"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.state}
              />
            </label>
            <br/>
            <label className="start_date text-white">
              START DATE  (MM/DD/YYYY)
              <input
                name="start_date"
                id="start_date"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.start_date}
              />
            </label>
            <br/>
            <label className="end_date text-white">
              END DATE  (MM/DD/YYYY)
              <input
                name="end_date"
                id="end_date"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.end_date}
              />
            </label><br/>
            <input className="button" type="submit" value="Add New Trip" />
          </form>
        </div>
        <div className="bottom-bar">
        <Link to="/trips">Back to Home</Link>
        <Link to={`/trips/${props.tripId}`}>Back to Trip Info</Link>
        </div>
      </div>

  )
}

export default NewTripForm
