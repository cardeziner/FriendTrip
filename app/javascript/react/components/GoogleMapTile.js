import React, { useState, useEffect } from 'react'

const GoogleMapTile = (props) => {

if(props.longitude){
  useEffect(() => {

    var map = new mqgl.Map(`map${props.id}`, 'PMGV4KC3xOKAyYU6yc0GLua1GQHjrmVW', {
      center: [props.latitude, props.longitude],
      zoom: 13,
      pitch: 60,
      bearing: 0
    });

    map.load(function() {
      setTimeout(function() {
        map.map.flyTo({speed: 0.5, zoom: 15, pitch: 60, bearing: 0, center: [props.latitude, props.longitude]})
      }, 1000);
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
