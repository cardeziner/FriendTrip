import React, { useState } from 'react'
import SearchBar from 'material-ui-search-bar'
import Script from 'react-load-script'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const GooglePlaceComponent = (props) =>{
  const [results, setResults] = useState({})
  const [value, setValue] = useState({})
  const [place, setPlace] = useState({
      name: '',
      city: '',
      query: ''
  })

  // see if you can define `autocomplete` outside of handleScriptLoad

  let autocomplete


  const handleScriptLoad = () =>{
    const options = {
      types: ['establishment'],
    }

    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    )

    autocomplete.setFields(['address_components', 'formatted_address'])
    autocomplete.addListener('place_changed', handlePlaceSelect())
    // this might work but try the
  }

  const handlePlaceSelect = () =>{
    const addressObject = autocomplete.getPlace();
    const address = addressObject.address_components;
    if (address) {
      setResults(address)
      setPlace(
        {
          name: address.gm_accessors_.place.We.formattedPrediction.split(",")[0],
          city: address.address[0].long_name,
          query: address.formatted_address,
        }
      )
    }
  }
  const googleAPI = process.env.REACT_APP_GOOGLE_API_KEY

    return (
      <div>
        <GooglePlacesAutocomplete
          onLoadFailed={(error) => (console.error("Could not inject Google script", error))}
          hintText="hello"
          selectProps={{
            value,
            onChange: setValue,
          }}
        />
      </div>
    );
}

export default GooglePlaceComponent
