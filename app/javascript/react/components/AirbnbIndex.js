import React, { useState, useEffect } from 'react'

const AirbnbIndex = props =>{

  const [locationResults, setLocationResults] = useState({})


  useEffect(() =>{
    fetch("https://mashvisor-api.p.rapidapi.com/airbnb-property/active-listings?state=CA&zip_code=91342&page=1&city=San%20Francisco&items=4", {
	     "method": "GET",
	      "headers": {
		        "x-rapidapi-key": "26169f8158msh2412dd030a7ba8ep1feac3jsn87364f9e3c07",
		          "x-rapidapi-host": "mashvisor-api.p.rapidapi.com"
	        }
        })
        .then(response => {
          debugger
	         setLocationResults(response);
         })
         .catch(err => {
	          console.error(err);
          }
        )
      },[])


  return(
    <div>
    <div className="showhim center"><br/>
        <h5>HOVER ME</h5>
        <div className="showme"><h1>Hello World</h1></div>
    </div>
     </div>
  )
}

export default AirbnbIndex
