import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FyZGV6aW5lciIsImEiOiJja3QyOGZuZWQwbWxkMnFvM2xueDNvdmxtIn0._WjMDWL2Rl3138oFlaOQHg';

const GoogleMapTile = (props) => {

  if(0 > props.longitude > 0){
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(props.longitude);
  const [lat, setLat] = useState(props.latitude);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
  if (map.current) return; // initialize map only once
  map.current = new mapboxgl.Map({
  container: mapContainer.current,
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [lng, lat],
  zoom: zoom
  });
  });

  useEffect(() => {
  if (!map.current) return; // wait for map to initialize
  map.current.on('move', () => {
  setLng(map.current.getCenter().lng.toFixed(4));
  setLat(map.current.getCenter().lat.toFixed(4));
  setZoom(map.current.getZoom().toFixed(2));
  });
  });

  return (
  <div>
  <div className="sidebar">
  Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
  </div>
  <div ref={mapContainer} className="map-container" />
  </div>
  );
}else{
  return(
    <div>MAP ERROR</div>
  )
}
}



export default GoogleMapTile
