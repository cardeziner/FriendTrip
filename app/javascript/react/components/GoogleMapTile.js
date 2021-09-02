import React, { useState, useEffect } from 'react'

const GoogleMapTile = (props) => {
  const [geoData, setGeoData] = useState({})
  const [lat, setLat] = useState(0)
  const [long,setLong] = useState(0)

if(props.id){

  // useEffect(() =>{
  //   fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=oFb44f4KnLyBTFo8vVTt2cshmxLC0W9L&location=${props.location}`, {
  //     credentials: "same-origin"
  //   })
  //   .then(response =>{
  //       if(response.ok) {
  //         return response
  //       } else {
  //         let errorMessage = `${response.status} (${response.statusText})`
  //           error = new Error(errorMessage)
  //         throw(error)
  //       }
  //     })
  //     .then(response => response.json())
  //     .then(parsedGeoData => {
  //       setGeoData(parsedGeoData.results[0].locations[0].latLng)
  //       setLat(parsedGeoData.results[0].locations[0].latLng.lat)
  //       setLong(parsedGeoData.results[0].locations[0].latLng.lng)
  //     })
  //     .catch(error => console.error(`Error in fetch: ${error.message}`))
  //   }, [])

  useEffect(() => {

    // const axios = require('axios');
    // const params = {
    //     access_key: '2cfdc801d7ace9435a1650bb6ba4b3df',
    //     query: `${props.location}`
    // }
    //
    // axios.get('https://api.positionstack.com/v1/forward', {params})
    //   .then(response => {
    //     console.log(response.data);
    //   }).catch(error => {
    //     debugger
    //     console.log(error);
    //   });

    const geocoder = new google.maps.Geocoder();
    // ^^ grabs the current geo location
    const address = `${props.location}`
    // ^^ string int

    geocoder.geocode( { 'address': address}, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var delay = 100
        let latitude = results[0].geometry.location.lat()
        let longitude = results[0].geometry.location.lng
        const map = new google.maps.Map(document.getElementById(`map${props.id}`), {
             center: results[0].geometry.location,
             zoom: 12
        })
        const marker = new google.maps.Marker({position: results[0].geometry.location, map: map})
        google.maps.event.addListener(marker, 'click', function () {
          window.open('https://www.google.com/maps?z=12&t=m&q=loc:latitude+longitude');
       })
        marker.setMap( map )
      }
    })
  },[])

  return (
    <div id={`map${props.id}`}></div>
  )
}else{
  return(
    <div>status</div>
  )
}
}

export default GoogleMapTile
