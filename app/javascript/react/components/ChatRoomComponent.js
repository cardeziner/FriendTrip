import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'

const ChatRoomComponent = (props)  =>{
  const [chats, setChats] = useState([])
  const [newFormPayload, setNewFormPayload] = useState({
    chat_text: ""
  })

  const addNewChat = (formPayload) => {
    fetch('/api/v1/chats', {
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
      .then(parsedChatData => {
        debugger
        let chats = parsedChatData
        setChats(chats)
        setRedirect(true)
      })
      .catch(error => console.error(`Error in fetch: ${errorMessage}`))
    }

  const handleInputChange = event =>{
    setNewFormPayload({
      ...newFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () =>{
    let submitErrors = {}
    const requiredField = ["chat_text"]
    debugger
      if (newFormPayload[requiredField].trim() === ""){
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      addNewChat({ event: newFormPayload })
      setNewFormPayload({
        chat_text: ""
      })
      setErrors({})
    }
  }

  return(
    <div className="scroll">
      <form>

      </form>
    </div>
  )
}

export default ChatRoomComponent
