import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'

const NewFlightForm = props =>{
  const [errors, setErrors] = useState({})
  const [redirect, setRedirect] = useState(false)
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


  // ebugger
  // let handleInputChange
  if (props.currentUser){
    const handleInputChange = event =>{
      setNewFormPayload({
        ...newFormPayload,
        [event.currentTarget.name]: event.currentTarget.value
      })
    }

    const validForSubmission = () =>{
      let submitErrors = {}
      const requiredFields = ["airline", "on_time_status", "departure_date", "departure_time", "arrival_date", "arrival_time", "departing_airport", "arriving_airport"]
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
        // setNewFormPayload({
        //   ...newFormPayload,
        //   user_id: props.currentUser.id,
        //   user_name: props.currentUser.first_name
        // })
        newFormPayload["user_id"] = props.currentUser.id
        newFormPayload["user_name"] = props.currentUser.first_name
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
        window.location.reload()
      }
    }

    if(redirect){
      return(
        <Redirect to={`/trips/${props.tripId}`}/>
      )
    }

    return(
      <div className="center">
      <h1 className="bold-blue">ENTER FLIGHT INFO </h1>
        <form onSubmit={handleSubmit} className="wide-field">
          <label className="airline text-white">
            AIRLINE<br/>
            <input
              name="airline"
              id="airline"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.airline}
            />
          </label><br/>
          <label className="name text-white">
            DEPARTING AIRPORT<br/>
            <input
              name="departing_airport"
              id="departing_airport"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.departing_airport}
            />
          </label><br/>
          <label className="name text-white">
            ARRIVING AIRPORT<br/>
            <input
              name="arriving_airport"
              id="arriving_airport"
              type="text"
              onChange={handleInputChange}
              value={newFormPayload.arriving_airport}
            />
          </label><br/>
          <label className="on_time_status text-white">
            IS FLIGHT STATUS 'ON TIME'?<br/>
            <input
              name="on_time_status"
              id="on_time_status"
              type="checkbox"
              onChange={handleInputChange}
              value={newFormPayload.on_time_status}
            />
          </label><br/>
          <label className="name text-white">
            DEPARTURE DATE<br/>
            <input
              name="departure_date"
              id="departure_date"
              type="date"
              onChange={handleInputChange}
              value={newFormPayload.departure_date}
            />
          </label><br/>
          <label className="name text-white">
            DEPARTURE TIME<br/>
            <input
              name="departure_time"
              id="departure_time"
              type="time"
              onChange={handleInputChange}
              value={newFormPayload.departure_time}
            />
          </label><br/>
          <label className="name text-white">
            ARRIVAL DATE<br/>
            <input
              name="arrival_date"
              id="arrival_date"
              type="date"
              onChange={handleInputChange}
              value={newFormPayload.arrival_date}
            />
          </label><br/>
          <label className="name text-white">
            ARRIVAL TIME<br/>
            <input
              name="arrival_time"
              id="arrival_time"
              type="time"
              onChange={handleInputChange}
              value={newFormPayload.arrival_time}
            />
          </label><br/>
          <br/><br/>
          <input className="btn btn-primary text center" type="submit" value="Add Flight" />
        </form><br/>
      </div>
    )
  }else{
    return(<div className="center">LOADING - PLEASE WAIT!</div>)
  }
}

export default NewFlightForm
