import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const NewEventForm = props =>{
  const [errors, setErrors] = useState({})
  const [newFormPayload, setNewFormPayload] = useState({
    name: "",
    location: "",
    cost: 0,
    date: "",
    trip_id: props.tripId,
  })

  const handleInputChange = event =>{
    setNewFormPayload({
      ...newFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () =>{
    let submitErrors = {}
    const requiredFields = ["name", "location", "cost", "date"]
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
      props.addNewEvent({ event: newFormPayload })
      setNewFormPayload({
        name: "",
        location: "",
        cost: 0,
        date: "",
      })
      setErrors({})
    }
  }

  return(
    <div>
      <h1 className="font text-blue">ADD A NEW TRIP EVENT</h1>
        <div className="text">
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
            <label className="location">
              location:
              <input
                name="location"
                id="location"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.location}
              />
              </label>
              <label className="cost">
                Cost (per person):
                <input
                  name="cost"
                  id="cost"
                  type="text"
                  onChange={handleInputChange}
                  value={newFormPayload.cost}
                />
            </label>
            <label className="date">
              Date:
              <input
                name="date"
                id="date"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.date}
              />
            </label><br/>

          <div className="center">
            <input className="submit" type="submit" value="Add new event" />
          </div><br/>
          </form>
        </div>
        <div className="center">
        <Link to="/trips" className="text">Back to Home</Link>
        </div>
      </div>
  )
}
export default NewEventForm
