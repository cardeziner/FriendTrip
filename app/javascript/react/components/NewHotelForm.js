import React, { useState, useEffect } from 'react'

const NewHotelForm = props =>{
  const [errors, setErrors] = useState({})
  const [redirect, setRedirect] = useState(false)
  const [newFormPayload, setNewFormPayload] = ({
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

  return(
    <div>hello from New Hotel Form</div>
  )
}

export default NewHotelForm
