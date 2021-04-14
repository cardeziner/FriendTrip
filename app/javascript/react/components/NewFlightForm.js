import React, {useState, useEffect} from 'react'

const NewFlightForm = props =>{
  if(props.currentUser){
    const [errors, setErrors] = useState({})
    const [userId, setUserId] = useState({})
    const [newFormPayload, setNewFormPayload] = useState({
      airline: "",
      on_time_status: "N/A",
      departure_date: "",
      departure_time: "",
      arrival_date: "",
      arrival_time: "",
      user_id: props.currentUser.id,
      trip_id: props.tripId,
      user_name: props.currentUser.first_name,
      departing_airport:"",
      arriving_airport: "",
    })

    const handleInputChange = event =>{
      setNewFormPayload({
        ...newFormPayload,
        [event.currentTarget.name]: event.currentTarget.value
      })
    }

    const validForSubmission = () =>{
      let submitErrors = {}
      const requiredFields = ["airline", "on_time_status", "departure_date", "departure_time", "arrival_date", "arrival_time", "user_name", "departing_airport", "arriving_airport"]
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
          user_id: props.currentUser.id,
          trip_id: props.tripId,
          user_name: props.currentUser.first_name,
          departing_airport: "",
          arriving_airport: "",
        })
        setErrors({})
      }
    }

    return(
      <div className="center">
      <h1 className="bold-blue">ENTER FLIGHT INFO </h1>
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
          </label><br/>
          <label className="on_time_status text-white">
            On-time status<br/>
            <input
              name="on_time_status"
              id="on_time_status"
              type="on_time_status"
              onChange={handleInputChange}
              value={newFormPayload.on_time_status}
            />
          </label><br/>
          <label className="name text-white">
            departure_date<br/>
            <input
              name="departure_date"
              id="departure_date"
              type="date"
              onChange={handleInputChange}
              value={newFormPayload.departure_date}
            />
          </label><br/>
          <label className="name text-white">
            departure_time<br/>
            <input
              name="departure_time"
              id="departure_time"
              type="time"
              onChange={handleInputChange}
              value={newFormPayload.departure_time}
            />
          </label><br/>
          <label className="name text-white">
            arrival_date<br/>
            <input
              name="arrival_date"
              id="arrival_date"
              type="date"
              onChange={handleInputChange}
              value={newFormPayload.arrival_date}
            />
          </label><br/>
          <label className="name text-white">
            arrival_time<br/>
            <input
              name="arrival_time"
              id="arrival_time"
              type="time"
              onChange={handleInputChange}
              value={newFormPayload.arrival_time}
            />
          </label><br/>
          <label className="name text-white">
            departing_airport<br/>
            <input
              name="departing_airport"
              id="departing_airport"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.departing_airport}
            />
          </label><br/>
          <label className="name text-white">
            arriving_airport<br/>
            <input
              name="arriving_airport"
              id="arriving_airport"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.arriving_airport}
            />
          </label>
          <br/><br/>
          <input className="btn btn-primary text center" type="submit" value="Add Flight" />
        </form><br/>
      </div>
    )
  }else{
    return(
      <div className="center">Loading...Please Wait</div>
    )
  }
}

export default NewFlightForm
