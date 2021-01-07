import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import BackdropFilter from "react-backdrop-filter";

const NewEventForm = props =>{
  const [errors, setErrors] = useState({})
  const [newFormPayload, setNewFormPayload] = useState({
    name: "",
    location: "",
    cost: "0",
    date: "",
    trip_id: props.id,
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
    <div key={props.id}><br/>
      <h1 className="accent-red center">+ NEW TRIP EVENT</h1>
      <p className="line"></p>
      <p className="text-yellow center">FILL OUT REQUIRED FIELDS BELOW FOR THE EVENT YOU WOULD LIKE TO POST</p>
      <div className="text">
          <form onSubmit={handleSubmit}>
            <label className="name text-white">
              NAME
              <input
                name="name"
                id="name"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.name}
              />
            </label><br/>
            <label className="location text-white">
              LOCATION
              <input
                name="location"
                id="location"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.location}
              />
            </label><br/>
            <label className="cost text-white">
              COST (PER PERSON)
              <input
                name="cost"
                id="cost"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.cost}
              />
            </label><br/>
            <label className="text-white">
              DATE OF EVENT
              <input
                name="date"
                id="date"
                type="date"
                onChange={handleInputChange}
                value={newFormPayload.date}
              />
            </label><br/>
            <div className="center">
              <input className="tn btn-primary no-dec text center" type="submit" value="ADD NEW EVENT" />
            </div>
          </form>
        </div>
        <div className="text-white no-dec center"><br/>
          <Link to="/trips" className="text-white no-dec">Back to Home</Link>
        </div><br/>
      </div>
  )
}
export default NewEventForm
