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
  })

  return(
    <div>Hello from Flight Form</div>
  )
}

export default NewFlightForm
