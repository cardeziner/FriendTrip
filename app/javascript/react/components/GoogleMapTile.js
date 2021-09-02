import React, { useState, useEffect } from 'react'

const GoogleMapTile = (props) => {
  const [geoData, setGeoData] = useState({})
  const [lat, setLat] = useState(0)
  const [long,setLong] = useState(0)

if(props.location){

  useEffect(() =>{
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=PMGV4KC3xOKAyYU6yc0GLua1GQHjrmVW&location=${props.location}`, {
      credentials: "same-origin"
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
      .then(parsedGeoData => {
        setGeoData(parsedGeoData.results[0].locations[0].latLng)
        setLat(parsedGeoData.results[0].locations[0].latLng.lat)
        setLong(parsedGeoData.results[0].locations[0].latLng.lng)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }, [])

  useEffect(() => {
    var map = new mqgl.Map(`map${props.id}`, 'KEY', {
      center: [-122.2082454,37.4780123],
      zoom: 13,
      pitch: 60,
      bearing: 0
    });

    map.load(function() {
      setTimeout(function() {
        map.map.flyTo({speed: 0.5, zoom: 15, pitch: 60, bearing: 180, center: [-122.3989808,37.7517676]})
      }, 2000);
    });
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
