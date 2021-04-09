import React, {useState, useEffect} from 'react'

const NewFlightForm = props =>{
  debugger
  const [errors, setErrors] = useState({})
  const [flight, setFlight] = useState({})
  const [newFormPayload, setNewFormPayload] = useState({
    airline: "",
    on_time_status: "N/A",
    departure_date: "",
    departure_time: "",
    arrival_date: "",
    arrival_time: "",
    user_id: props.userId,
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
      props.addNewFlight({ flight: newFormPayload })
      setNewFormPayload({
        airline: "",
        on_time_status: "",
        departure_date: "",
        departure_time: "",
        arrival_date: "",
        arrival_time: "",
        user_id: props.userId,
        trip_id: props.tripId,
      })
      setErrors({})
    }
  }

  return(
    <div className="text-white">Hello from Flight Form
      <form onSubmit={handleSubmit} className="wide-field">
        <label className="airline text-white">
          Airline<br/>
          <input
            name="airline"
            id="airline"
            type="airline"
            onChange={handleInputChange}
            value={newFormPayload.airline}
          />
        </label>
        <label className="on_time_status text-white">
          On-time status<br/>
          <input
            name="on_time_status"
            id="on_time_status"
            type="on_time_status"
            onChange={handleInputChange}
            value={newFormPayload.on_time_status}
          />
        </label>
        <label className="name text-white">
          departure_date<br/>
          <input
            name="departure_date"
            id="departure_date"
            type="date"
            onChange={handleInputChange}
            value={newFormPayload.departure_date}
          />
        </label>
        <label className="name text-white">
          departure_time<br/>
          <input
            name="departure_time"
            id="departure_time"
            type="departure_time"
            onChange={handleInputChange}
            value={newFormPayload.departure_time}
          />
        </label>
        <label className="name text-white">
          arrival_date<br/>
          <input
            name="arrival_date"
            id="arrival_date"
            type="date"
            onChange={handleInputChange}
            value={newFormPayload.arrival_date}
          />
        </label>
        <label className="name text-white">
          arrival_time<br/>
          <input
            name="arrival_time"
            id="arrival_time"
            type="arrival_time"
            onChange={handleInputChange}
            value={newFormPayload.arrival_time}
          />
        </label>
        <input className="btn btn-primary text center" type="submit" value="Add Flight" />
      </form><br/>
    </div>
  )
}

export default NewFlightForm
