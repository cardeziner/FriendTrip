import React, { Component, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode"

const AnyReactComponent = ({ text }) => <div>{text}</div>



Geocode.setApiKey("AIzaSyB6-s7yJ6sFvKg1iFz2RMBzkHC2rWm8ncY")
Geocode.setLanguage("en")
Geocode.setRegion("es")
Geocode.enableDebug()

Geocode.fromAddress("Eiffel Tower").then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    let lattitude = lat
    let longitude = lng
  },
  error => {
    console.error(error);
  }
)

class GoogleMap extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '30h', width: '60%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB6-s7yJ6sFvKg1iFz2RMBzkHC2rWm8ncY' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={lattitude}
            lng={longitude}
            text="Your FriendTrip Location!"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap
