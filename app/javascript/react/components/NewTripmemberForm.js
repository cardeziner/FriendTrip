import React from 'react'

const NewTripmemberForm = props =>{

  const handleSubmit = event => {

    event.preventDefault()
    if (validForSubmission()) {
      props.addNewEvent({ event: newFormPayload })
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
