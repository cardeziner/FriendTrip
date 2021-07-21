import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'

const ChatRoomComponent = (props)  =>{
  const [chats, setChats] = useState([])

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

    // if (redirect) {
    //   // return <Redirect to={`/trips/${trip.id}`} />
    // }


  return(
    <div>
      <TextField id="time" type="text" label="standard"/>
    </div>
  )
}

export default ChatRoomComponent
