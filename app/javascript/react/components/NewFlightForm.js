import React, {useState, useEffect} from 'react'

const NewFlightForm = props =>{
  const [errors, setErrors] = useState({})
  const [formPayload, newFormPayload] = useState({
    airline: "",
    on_time_status: "N/A",
    departure_date: "",
    departure_time: "",
    arrival_date: "",
    arrival_time: "",
    user_id: props.userId.id,
    trip_id: props.tripId,
  })

  const handeInputChange = event =>{
    setNewFormPayload({
      ...newFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () =>{
    let submitErrors = {}
    const requiredFields = ["airline", "on_time_status", "departure_date", "departure_time", "arrival_date",  "arrival_time"]
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
      addNewFlight({ flight: newFormPayload })
      setNewFormPayload({
        airline: "",
        on_time_status: "",
        departure_date: "",
        departure_time: "",
        arrival_date: "",
        arrival_time: "",
        user_id: props.userId.id,
        trip_id: props.tripId,
      })
      setErrors({})
    }
  }

  return(
    <div className="text-white">Hello from Flight Form</div>
  )
}

export default NewFlightForm
