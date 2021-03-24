import React, { useState, useEffect } from 'react'
import NewFlightForm from './NewFlightForm'

const FlightTile = props =>{

  const [flightInfo, setFlightInfo] = useState({})
  const flights = props.flightData

  useEffect(() =>{
    fetch(`/api/v1/flights`, {
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
    .then(parsedFlightData =>{
      setFlightInfo(parsedFlightData.group_flights)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const flightList = flights.map(flight =>{
    return(
      <h1>{flight.airline}</h1>
    )
  })
//   useEffect(() =>{
//     fetch("https://priceline-com.p.rapidapi.com/cars/SEA?pickup_date=2021-01-31T12%3A00&return_date=2021-02-10T12%3A00", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "26169f8158msh2412dd030a7ba8ep1feac3jsn87364f9e3c07",
// 		"x-rapidapi-host": "priceline-com.p.rapidapi.com"
// 	}
// })
//     .then(response =>{
//         if(response.ok) {
//           return response
//         } else {
//           let errorMessage = `${response.status} (${response.statusText})`
//             error = new Error(errorMessage)
//           throw(error)
//         }
//       })
//       .then(response => response.json())
//
//       .then(parsedTrip => {
//         debugger
//       })
//       .catch(error => console.error(`Error in fetch: ${error.message}`))
//     }, [])

  return(
    <div>
    {flightList}
    <NewFlightForm
    />
    </div>
  )
}

export default FlightTile
