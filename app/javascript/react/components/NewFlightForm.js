import React, {useState, useEffect} from 'react'

const NewFlightForm = props =>{
  const [errors, setErrors] = useState({})
  const [flight, setFlight] = useState({})
  const [newFormPayload, setNewFormPayload] = useState({
    airline: "",
    on_time_status: "N/A",
    departure_date: "",
    departure_time: "",
    arrival_date: "",
    arrival_time: "",
    user_id: props.userId.id,
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

  const addNewFlight = (formPayload) => {
    fetch('/api/v1/flights', {
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
      .then(parsedNewFlight => {
        debugger
        setFlight(parsedNewFlight)
        setRedirect(true)
      })
      .catch(error => console.error(`Error in fetch: ${errorMessage}`))
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
            type="departure_date"
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
            type="arrival_date"
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
        <input className="btn btn-primary text center" type="submit" value="Add Trip" />
      </form><br/>
    </div>
  )
}

export default NewFlightForm
