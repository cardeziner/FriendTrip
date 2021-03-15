import React, { useState, useEffect } from 'react'

const FlightTile = props =>{

  useEffect(() =>{
    fetch("https://priceline-com.p.rapidapi.com/cars/SEA?pickup_date=2021-01-31T12%3A00&return_date=2021-02-10T12%3A00", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "26169f8158msh2412dd030a7ba8ep1feac3jsn87364f9e3c07",
		"x-rapidapi-host": "priceline-com.p.rapidapi.com"
	}
})
    .then(response =>{
        if(response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`
            error = new Error(errorMessage)
          throw(error)
        }
      })
      .then(response => response.json())

      .then(parsedTrip => {
        debugger
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }, [])

  return(
    <div>
    hello world
    </div>
  )
}

export default FlightTile
