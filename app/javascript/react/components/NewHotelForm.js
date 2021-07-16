import React, { useState, useEffect } from 'react'

const NewHotelForm = props =>{
  const [errors, setErrors] = useState({})
  const [redirect, setRedirect] = useState(false)
  const [newFormPayload, setNewFormPayload] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    check_in: "",
    check_out: "",
    trip_id: null,
  })

  const handleInputChange = event =>{
    setNewFormPayload({
      ...newFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () =>{
    let submitErrors = {}
    const requiredFields = ["name", "address", "city", "state", "check_in", "check_out"]
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
    newFormPayload["trip_id"] = props.tripId
    if (validForSubmission()) {
      props.addNewHotel({ hotel: newFormPayload })
      setNewFormPayload({
        name: "",
        address: "",
        city: "",
        state: "",
        check_in: "",
        check_out: "",
      })
      setErrors({})
      setRedirect(true)
    }
  }

  return(
    <div>
      <h1 className="text-purp center">ENTER HOTEL INFO </h1>
        <form onSubmit={handleSubmit} className="wide-field center">
          <label className="airline text-white">
            NAME<br/>
            <input
              name="name"
              id="name"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.name}
            />
          </label><br/>
          <label className="name text-white">
            ADDRESS<br/>
            <input
              name="address"
              id="address"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.address}
            />
          </label><br/>
          <label className="name text-white">
            CITY<br/>
            <input
              name="city"
              id="city"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.city}
            />
          </label><br/>
          <label className="on_time_status text-white">
            STATE<br/>
            <input
              name="state"
              id="state"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.state}
            />
          </label><br/>
          <label className="name text-white">
            CHECK-IN<br/>
            <input
              name="check_in"
              id="check_in"
              type="date"
              onChange={handleInputChange}
              value={newFormPayload.check_in}
            />
          </label><br/>
          <label className="name text-white">
            CHECK-OUT<br/>
            <input
              name="check_out"
              id="check_out"
              type="date"
              onChange={handleInputChange}
              value={newFormPayload.check_out}
            />
          </label><br/>
          <br/><br/>
          <input className="btn btn-primary text center" type="submit" value="Add Hotel" />
        </form><br/>
    </div>
  )
}

export default NewHotelForm
