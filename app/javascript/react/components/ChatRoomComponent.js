import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'

const ChatRoomComponent = (props)  =>{
  const [chats, setChats] = useState([])
  const [errors, setErrors] = useState({})
  const [chatList, setChatList] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [newFormPayload, setNewFormPayload] = useState({
    chat_text: "",
    trip_id: "",
  })

  if(props.tripId){

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
        let chats = parsedChatData
        setChats(chats)
        setRedirect(true)
      })
      .catch(error => console.error(`Error in fetch: ${errorMessage}`))
    }

    useEffect(() =>{
      fetch(`/api/v1/chats`, {
        credentials: "same-origin",
          })
      .then(response => {
        if(response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`
          error = new Error(errorMessage)
          throw(error)
        }
      })
      .then(response => response.json())
      .then(parsedChatData =>{
        setCurrentUser(parsedChatData.current_user)
        setChatList(parsedChatData.chats)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }, [])

  const handleInputChange = event =>{
    setNewFormPayload({
      ...newFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const tripChatList = chatList.map(chat =>{
    return(
      <div className="text-green" key={chat.id}>{chat.chat_text}</div>
    )
  })

  const validForSubmission = () =>{
    let submitErrors = {}
    const requiredField = ["chat_text"]
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
    newFormPayload["trip_id"] = props.tripId
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
      {tripChatList}
      <form onSubmit={handleSubmit}>
      <input
        name="chat_text"
        id="chat_text"
        type="text"
        className="form-field inline bottom"
        onChange={handleInputChange}
        value={newFormPayload.chat_text}
      />
        <input className="inline bottom button" type="submit" value="Send"/>
      </form>
    </div>
  )
}else{
  return(<div>WAITING FOR PROPS!</div>)
}
}

export default ChatRoomComponent
