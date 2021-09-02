import React, { useEffect } from 'react'

const GoogleMapTile = (props) => {

if(props.id){

  useEffect(() => {

    const axios = require('axios');
    const params = {
        access_key: '2cfdc801d7ace9435a1650bb6ba4b3df',
        query: `${props.location}`
    }

    axios.get('https://api.positionstack.com/v1/forward', {params})
      .then(response => {
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      });

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
