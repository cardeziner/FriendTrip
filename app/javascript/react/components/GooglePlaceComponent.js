import React, { useState } from 'react'
import SearchBar from 'material-ui-search-bar'
import Script from 'react-load-script'

const GooglePlaceComponent = (props) =>{
  const [results, setResults] = useState({})
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
    autocomplete.addListener('select', handlePlaceSelect())
    // this might work but try the
  }

  const handlePlaceSelect = () =>{
    const addressObject = autocomplete.getPlace();
    debugger
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

    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfko-fZFYDu55aKlWlZUVAAL0sXsbrbqo&libraries=places"
          onLoad={handleScriptLoad}
        />
        <SearchBar
          id="autocomplete"
          placeholder=""
          hintText="Search Establishment"
          onClick={handleScriptLoad}
          style={{
            margin: '0 auto',
            maxWidth: 800,
          }}
        />
        <h1>hello{place.name}</h1>
      </div>
    );
}

export default GooglePlaceComponent
