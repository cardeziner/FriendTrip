import React, { Component, useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode"

const GoogleMapTile = (props) => {

const location = props.city

const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [locationProps, setLocationProps] = useState({})




  useEffect(() =>{

    Geocode.setApiKey("AIzaSyB6-s7yJ6sFvKg1iFz2RMBzkHC2rWm8ncY");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.enableDebug();


    Geocode.fromAddress("San Diego").then(
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
  },[])

  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude
    },
    zoom: 11
  };

    return (
      <div className="align-items"><p>{props.location}</p>
      <div style={{ height: '15%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB6-s7yJ6sFvKg1iFz2RMBzkHC2rWm8ncY' }}
          center={[latitude,longitude]}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={latitude}
            lng={longitude}
            text=<h5 className="font green">FriendTrip</h5>
          />
          </GoogleMapReact>
          </div>
          </div>
    )
  }


export default GoogleMapTile
