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
    if (validForSubmission()) {
      props.addNewFlight({ flight: newFormPayload })
      setNewFormPayload({
        airline: "",
        on_time_status: "",
        departure_date: "",
        departure_time: "",
        arrival_date: "",
        arrival_time: "",
        user_id: "",
        trip_id: "",
        user_name: "",
        departing_airport: "",
        arriving_airport: "",
      })
      setErrors({})
      setRedirect(true)
    }
  }

  return(
    <div>hello from New Hotel Form</div>
  )
}

export default NewHotelForm
