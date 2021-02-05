import React from 'react'

const NewTripmemberForm = props =>{

  const handleSubmit = event => {

    const validForSubmission = () =>{
      let submitErrors = {}
      const requiredFields = ["email", "first_name", "last_name"]
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

    event.preventDefault()
    if (validForSubmission()) {
      props.addNewEvent({ user: newFormPayload })
      setNewFormPayload({
        email: "",
        first_name: "",
        last_name: "",
        encrypted_password: "password"
      })
      setErrors({})
    }
  }

  return(
    <div>
      <h1>
        hello world from Invite Form
      </h1>
    </div>
  )
}

export default NewTripmemberForm
