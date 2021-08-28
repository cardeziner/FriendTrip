import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'

const ChatRoomComponent = (props)  =>{
  const [chats, setChats] = useState([])
  const [errors, setErrors] = useState({})
  const [chatList, setChatList] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [userStatus, setUserStatus] = useState("current")
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
      setChatList(props.tripChats)
      setCurrentUser(props.currentUser)
    })

    // useEffect(() =>{
    //   fetch(`/api/v1/chats`, {
    //     credentials: "same-origin",
    //       })
    //   .then(response => {
    //     if(response.ok) {
    //       return response
    //     } else {
    //       let errorMessage = `${response.status} (${response.statusText})`
    //       error = new Error(errorMessage)
    //       throw(error)
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(parsedChatData =>{
    //     setCurrentUser(parsedChatData.current_user)
    //     setChatList(parsedChatData.chats)
    //   })
    //   .catch(error => console.error(`Error in fetch: ${error.message}`))
    // }, [])

  const handleInputChange = event =>{
    setNewFormPayload({
      ...newFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const tripChatList = chatList.map(chat =>{
    if(chat.user_name === currentUser.first_name + " " + currentUser.last_name[0]){
      return(
        <div key={chat.id}>
          <div>
          <h4><span className="current-blue font">{chat.chat_text}</span></h4><br/><br/>
          </div>
        </div>
      )
    }else{
      return(
        <div key={chat.id}>
          <div>
            <p className="mini-text-left">{chat.user_name}</p><br/>
            <h4><span className="other-green font">{chat.chat_text}</span></h4><br/><br/>
          </div>
        </div>
      )
    }
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
    window.location.reload()
  }

  return(
    <div id="chats">
        <div className="chat-bord scroll">
        {tripChatList}
        </div>
        <div>
          <input
            name="chat_text"
            id="chat_text"
            role="text-box"
            className="chat-box"
            onChange={handleInputChange}
            value={newFormPayload.chat_text}
          />
          <input className="inline chat-submit" type="submit" value="Send"/>
        </div>
      <form onSubmit={handleSubmit} className="bord">

      </form>
    </div>
  )
}else{
  return(<div>WAITING FOR PROPS!</div>)
}
}

export default ChatRoomComponent
