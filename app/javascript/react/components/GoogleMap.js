import React, { Component, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode"

const GoogleMap = (props) => {

const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [locationProps, setLocationProps] = useState({})

Geocode.setApiKey("AIzaSyB6-s7yJ6sFvKg1iFz2RMBzkHC2rWm8ncY");
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.enableDebug();

Geocode.fromAddress("Eiffel Tower").then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    setLatitude(lat)
    setLongitude(lng)
    setLocationProps({center: {
      lat: lat,
      lng: lng
    },
    zoom: 11
  })
  },
  error => {
    console.error(error);
  }
)



  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50%', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB6-s7yJ6sFvKg1iFz2RMBzkHC2rWm8ncY' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={latitude}
            lng={longitude}
            text="Your FriendTrip Location!"
          />
        </GoogleMapReact>
      </div>
    )
  }


export default GoogleMap
